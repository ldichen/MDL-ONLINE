/*
 * @Author: DiChen
 * @Date: 2025-04-22 10:35:31
 * @LastEditors: DiChen
 * @LastEditTime: 2025-04-22 16:14:37
 */

import { v4 as uuidv4 } from "uuid";

// 定义类型
interface Dataset {
  name: string;
  type: "internal" | "external";
  description: string;
  externalId?: string;
  schema?: string;
}

interface Event {
  name: string;
  type: string;
  optional: string;
  description: string;
  dataset?: Dataset;
}

interface State {
  id: string;
  name: string;
  type: string;
  description: string;
  events: Event[];
  transitions?: string[];
}

interface Parameter {
  key: string;
  description: string;
  defaultValue: string;
}

interface HardwareConfig {
  configures: string;
  min: string;
  max: string;
}

interface SoftwareConfig {
  environment: string;
  platform: string;
  value: string;
}

interface Assembly {
  name: string;
  path: string;
}

interface Resource {
  type: string;
  name: string;
}

interface RuntimeInfo {
  name: string;
  version: string;
  baseDir: string;
  entryFile: {
    name: string;
    size: number;
    type: string;
    lastModified: number;
  } | null;
}

/**
 * 生成UUID
 * @returns UUID字符串
 */
function generateUuid(): string {
  return uuidv4();
}

/**
 * 处理事件类型，去掉括号内的内容
 * @param type - 原始事件类型
 * @returns 处理后的事件类型
 */
function processEventType(type: string): string {
  return type.replace(/\([^)]*\)/g, "");
}

/**
 * 收集所有的数据集
 * @param states - 状态数组
 * @returns 去重后的数据集数组
 */
function collectDatasets(states: State[]): Dataset[] {
  const datasetsMap = new Map<string, Dataset>();

  states.forEach((state) => {
    state.events?.forEach((event) => {
      if (event.dataset) {
        // 使用name作为key来去重
        datasetsMap.set(event.dataset.name, {
          ...event.dataset,
          externalId:
            event.dataset.type === "external" ? generateUuid() : undefined,
        });
      }
    });
  });

  return Array.from(datasetsMap.values());
}

/**
 * 收集所有的状态转换
 * @param states - 状态数组
 * @returns 状态转换数组
 */
function collectStateTransitions(
  states: State[]
): Array<{ from: string; to: string }> {
  const transitions: Array<{ from: string; to: string }> = [];

  states.forEach((state) => {
    state.transitions?.forEach((toStateId) => {
      transitions.push({
        from: state.id,
        to: toStateId,
      });
    });
  });

  return transitions;
}

/**
 * 将表单数据转换为XML格式
 * @param formData - 表单数据对象
 * @returns XML字符串
 */
export async function generateXML(
  formData: Record<string, any>
): Promise<string> {
  const { basicInfo, localAttribute, behavior, runtime } = formData;
  const name = basicInfo.name || "";
  const uid = generateUuid();
  const style = basicInfo.style || "";

  let xml = "<ModelClass";
  xml += ` name="${escapeXML(name)}"`;
  xml += ` uid="${uid}"`;
  xml += ` style="${escapeXML(style)}"`;
  xml += ">\n";

  // AttributeSet section
  xml += "  <AttributeSet>\n";

  // Categories section
  xml += "    <Categories>\n";
  xml += '      <Category principle="" path=""/>\n';
  xml += "    </Categories>\n";

  // LocalAttributes section
  xml += "    <LocalAttributes>\n";
  if (localAttribute?.tabs?.length > 0) {
    const firstTab = localAttribute.tabs[0];
    xml += "      <LocalAttribute";
    xml += ` local="${escapeXML(firstTab.language)}"`;
    xml += ` localName="${escapeXML(firstTab.localName)}"`;
    xml += ` wiki="${escapeXML(firstTab.wiki)}"`;
    xml += ">\n";
    xml += `        <Keywords>${escapeXML(firstTab.keywords)}</Keywords>\n`;
    xml += `        <Abstract>${escapeXML(firstTab.abstract)}</Abstract>\n`;
    xml += "      </LocalAttribute>\n";
  }
  xml += "    </LocalAttributes>\n";
  xml += "  </AttributeSet>\n";

  // Behavior section
  xml += "  <Behavior>\n";

  // RelatedDatasets section
  xml += "    <RelatedDatasets>\n";
  if (behavior?.states?.length > 0) {
    const datasets = collectDatasets(behavior.states);
    datasets.forEach((dataset) => {
      xml += `      <DatasetItem name="${escapeXML(
        dataset.name
      )}" type="${escapeXML(dataset.type)}" description="${escapeXML(
        dataset.description
      )}"`;
      if (dataset.type === "external" && dataset.externalId) {
        xml += ` externalId="${dataset.externalId}"`;
      }
      if (dataset.type === "internal") {
        xml += ">\n";
        xml += "        <UdxDeclaration>\n";
        xml += "          <UdxNode>\n";
        xml += `            ${escapeXML(dataset.schema || "")}\n`;
        xml += "          </UdxNode>\n";
        xml += "        </UdxDeclaration>\n";
        xml += "      </DatasetItem>\n";
      } else {
        xml += " />\n";
      }
    });
  }
  xml += "    </RelatedDatasets>\n";

  // Parameters section
  xml += "    <Parameters>\n";
  xml += "      <ProcessParameters>\n";
  if (behavior?.processParameters?.length > 0) {
    behavior.processParameters.forEach((param: Parameter) => {
      xml += `        <Add key="${escapeXML(
        param.key
      )}" description="${escapeXML(
        param.description
      )}" defaultValue="${escapeXML(param.defaultValue)}" />\n`;
    });
  }
  xml += "      </ProcessParameters>\n";
  xml += "      <ControlParameters>\n";
  if (behavior?.controlParameters?.length > 0) {
    behavior.controlParameters.forEach((param: Parameter) => {
      xml += `        <Add key="${escapeXML(
        param.key
      )}" description="${escapeXML(
        param.description
      )}" defaultValue="${escapeXML(param.defaultValue)}" />\n`;
    });
  }
  xml += "      </ControlParameters>\n";
  xml += "    </Parameters>\n";

  xml += "    <StateGroup>\n";
  // States section
  xml += "      <States>\n";
  if (behavior?.states?.length > 0) {
    behavior.states.forEach((state: State) => {
      xml += `        <State id="${escapeXML(state.id)}" name="${escapeXML(
        state.name
      )}" type="${escapeXML(state.type)}" description="${escapeXML(
        state.description
      )}">\n`;

      // Generate Events for each State
      if (state.events?.length > 0) {
        state.events.forEach((event: Event) => {
          const processedType = processEventType(event.type);
          xml += `          <Event name="${escapeXML(
            event.name
          )}" type="${escapeXML(processedType)}" optional="${escapeXML(
            event.optional
          )}" description="${escapeXML(event.description)}">\n`;

          // Add ResponseParameter or DispatchParameter based on dataset reference type
          if (event.dataset) {
            const parameterTag =
              event.dataset.type === "internal"
                ? "ResponseParameter"
                : "DispatchParameter";
            xml += `            <${parameterTag} datasetReference="${escapeXML(
              event.dataset.name
            )}" description="${escapeXML(event.dataset.description)}"/>\n`;
          }

          xml += "          </Event>\n";
        });
      }

      xml += "        </State>\n";
    });
  }
  xml += "      </States>\n";

  // StateTransitions section
  if (behavior?.states?.length > 0) {
    const transitions = collectStateTransitions(behavior.states);
    if (transitions.length > 0) {
      xml += "      <StateTransitions>\n";
      transitions.forEach((transition) => {
        xml += `        <Add from="${escapeXML(
          transition.from
        )}" to="${escapeXML(transition.to)}" />\n`;
      });
      xml += "      </StateTransitions>\n";
    } else {
      xml += "      <StateTransitions />\n";
    }
  } else {
    xml += "      <StateTransitions />\n";
  }

  xml += "    </StateGroup>\n";
  xml += "  </Behavior>\n";

  // Runtime section
  xml += "  <Runtime";
  if (runtime?.info) {
    xml += ` name="${escapeXML(runtime.info.name)}"`;
    xml += ` version="${escapeXML(runtime.info.version)}"`;
    xml += ` baseDir="${escapeXML(runtime.info.baseDir)}"`;
    if (runtime.info.entryFile) {
      xml += ` entry="${escapeXML(runtime.info.entryFile.name)}"`;
    }
  }
  xml += ">\n";

  // HardwareConfigures section
  xml += "    <HardwareConfigures>\n";
  if (runtime?.hardware?.length > 0) {
    runtime.hardware.forEach((config: HardwareConfig) => {
      xml += `      <Add key="${escapeXML(
        config.configures
      )}" value="${escapeXML(config.min)}" />\n`;
    });
  }
  xml += "    </HardwareConfigures>\n";

  // SoftwareConfigures section
  xml += "    <SoftwareConfigures>\n";
  if (runtime?.software?.length > 0) {
    runtime.software.forEach((config: SoftwareConfig) => {
      xml += `      <Add key="${escapeXML(
        config.environment
      )}" value="${escapeXML(config.platform)}" platform="${escapeXML(
        config.value
      )}" />\n`;
    });
  }
  xml += "    </SoftwareConfigures>\n";

  // Assemblies section
  xml += "    <Assemblies>\n";
  if (runtime?.assemblies?.length > 0) {
    runtime.assemblies.forEach((assembly: Assembly) => {
      xml += `      <Assembly name="${escapeXML(
        assembly.name
      )}" path="${escapeXML(assembly.path)}" />\n`;
    });
  }
  xml += "    </Assemblies>\n";

  // SupportiveResources section
  xml += "    <SupportiveResources>\n";
  if (runtime?.resources?.length > 0) {
    runtime.resources.forEach((resource: Resource) => {
      xml += `      <Add type="${escapeXML(resource.type)}" name="${escapeXML(
        resource.name
      )}" />\n`;
    });
  }
  xml += "    </SupportiveResources>\n";

  xml += "  </Runtime>\n";
  xml += "</ModelClass>";

  return xml;
}

// 转义XML特殊字符
const escapeXML = (str: string): string => {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
};

// 使用示例：
/*
const formData = {
  personalInfo: {
    name: "John Doe",
    age: 30,
    email: "john@example.com"
  },
  skills: ["JavaScript", "TypeScript", "React"],
  address: {
    street: "123 Main St",
    city: "Boston",
    country: "USA"
  }
};

const xml = generateXML(formData);
console.log(xml);
*/
