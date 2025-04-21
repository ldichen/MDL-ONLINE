import { writable } from "svelte/store";

// 定义初始数据结构
interface ModuleData {
  basicInfo: {
    name: string;
    version: string;
    type: string;
    description: string;
    keywords: string[];
    classification: Array<{
      id: string;
      label: string;
      selected: boolean;
      expanded: boolean;
      children?: Array<{
        id: string;
        label: string;
        selected: boolean;
        expanded: boolean;
        children?: Array<{
          id: string;
          label: string;
          selected: boolean;
          expanded: boolean;
        }>;
      }>;
    }>;
    // 其他基础信息字段
  };
  localAttribute: {
    tabs: Array<{
      id: number;
      language: string;
      localName: string;
      wiki: string;
      keywords: string;
      abstract: string;
      mechanism: Array<{
        type: string;
        name: string;
        value: string;
      }>;
      application: {
        spatiotemporalScale: string;
        stepLength: Array<{
          dimension: string;
          min: string;
          max: string;
          unit: string;
        }>;
        scope: {
          regionName: string;
          xMin: string;
          xMax: string;
          yMin: string;
          yMax: string;
          spatialRef: string;
        };
      };
    }>;
  };
  authors: {
    list: Array<{
      type: string;
      account: string;
      name: string;
      insCountry: string;
      insCity: string;
      insAddress: string;
      email: string;
      fax: string;
      phone: string;
    }>;
  };
  behavior: {
    states: Array<{
      id: string;
      name: string;
      type: string;
      description: string;
      transitions: string[];
      events: Array<{
        name: string;
        type: string;
        optional: string;
        description: string;
        dataset?: {
          name: string;
          type: string;
          description: string;
          schema: string;
        };
      }>;
    }>;
  };
  runtime: {
    info: {
      name: string;
      version: string;
      baseDir: string;
      entryFile: {
        name: string;
        size: number;
        type: string;
        lastModified: number;
      } | null;
    };
    hardware: Array<{
      configures: string;
      min: string;
      max: string;
    }>;
    software: Array<{
      environment: string;
      platform: string;
      value: string;
    }>;
    assemblies: Array<{
      name: string;
      path: string;
    }>;
    resources: Array<{
      type: string;
      name: string;
    }>;
  };
}

// 创建初始数据
const initialData: ModuleData = {
  basicInfo: {
    name: "",
    version: "",
    type: "",
    description: "",
    keywords: [],
    classification: [
      {
        id: "1",
        label: "Earth System Classification",
        selected: false,
        expanded: true,
        children: [
          {
            id: "1-1",
            label: "Water System Models",
            selected: false,
            expanded: false,
            children: [
              {
                id: "1-1-1",
                label: "Water System Synthetic Models",
                selected: false,
                expanded: false,
              },
              {
                id: "1-1-2",
                label: "Atmosphere Water System Models",
                selected: false,
                expanded: false,
              },
              {
                id: "1-1-3",
                label: "Ocean Water System Models",
                selected: false,
                expanded: false,
              },
              {
                id: "1-1-4",
                label: "Surface Water System Models",
                selected: false,
                expanded: false,
              },
              {
                id: "1-1-5",
                label: "Undergroud Water System Models",
                selected: false,
                expanded: false,
              },
              {
                id: "1-1-6",
                label: "Ice-Snow Water System Models",
                selected: false,
                expanded: false,
              },
            ],
          },
          {
            id: "1-2",
            label: "Solid System Models",
            selected: false,
            expanded: false,
            children: [
              {
                id: "1-2-1",
                label: "Soil Synthetic Models",
                selected: false,
                expanded: false,
              },
              {
                id: "1-2-2",
                label: "Soil System Physical Models",
                selected: false,
                expanded: false,
              },
              {
                id: "1-2-3",
                label: "Soil System Chemical Models",
                selected: false,
                expanded: false,
              },
              {
                id: "1-2-4",
                label: "Soil System Ecological Models",
                selected: false,
                expanded: false,
              },
              {
                id: "1-2-5",
                label: "Soil System Statistical Models",
                selected: false,
                expanded: false,
              },
            ],
          },
          {
            id: "1-3",
            label: "Atmosphere System Models",
            selected: false,
            expanded: false,
            children: [
              {
                id: "1-3-1",
                label: "Atmosphere Models",
                selected: false,
                expanded: false,
              },
              {
                id: "1-3-2",
                label: "Atmosphere System Physical Models",
                selected: false,
                expanded: false,
              },
              {
                id: "1-3-3",
                label: "Atmosphere System Chemical Models",
                selected: false,
                expanded: false,
              },
              {
                id: "1-3-4",
                label: "Atmosphere System Ecological Models",
                selected: false,
                expanded: false,
              },
              {
                id: "1-3-5",
                label: "Atmosphere System Statistical Models",
                selected: false,
                expanded: false,
              },
            ],
          },
          {
            id: "1-4",
            label: "Ecology System Models",
            selected: false,
            expanded: false,
            children: [
              {
                id: "1-4-1",
                label: "Ecology System Synthetic Models",
                selected: false,
                expanded: false,
              },
              {
                id: "1-4-2",
                label: "Forest Ecology System Models",
                selected: false,
                expanded: false,
              },
              {
                id: "1-4-3",
                label: "Agriculture Ecology System Models",
                selected: false,
                expanded: false,
              },
              {
                id: "1-4-4",
                label: "Grassland Ecology System Models",
                selected: false,
                expanded: false,
              },
              {
                id: "1-4-5",
                label: "Wetland Ecology System Models",
                selected: false,
                expanded: false,
              },
              {
                id: "1-4-6",
                label: "Freshwater Ecology System Models",
                selected: false,
                expanded: false,
              },
              {
                id: "1-4-7",
                label: "Seawater Ecology System Models",
                selected: false,
                expanded: false,
              },
              {
                id: "1-4-8",
                label: "City Ecology System Models",
                selected: false,
                expanded: false,
              },
            ],
          },
          {
            id: "1-5",
            label: "Human/Society/Economy System Models",
            selected: false,
            expanded: false,
            children: [
              {
                id: "1-5-1",
                label: "Human/Society/Economy System Synthetic Models",
                selected: false,
                expanded: false,
              },
              {
                id: "1-5-2",
                label: "Human/Society/Economy Physical Models",
                selected: false,
                expanded: false,
              },
              {
                id: "1-5-3",
                label: "Human/Society/Economy Chemical Models",
                selected: false,
                expanded: false,
              },
              {
                id: "1-5-4",
                label: "Human/Society/Economy Ecological Models",
                selected: false,
                expanded: false,
              },
              {
                id: "1-5-5",
                label: "Human/Society/Economy Statistical Models",
                selected: false,
                expanded: false,
              },
            ],
          },
          {
            id: "1-6",
            label: "Global Models",
            selected: false,
            expanded: false,
            children: [
              {
                id: "1-6-1",
                label: "Atomosphere System Models",
                selected: false,
                expanded: false,
              },
              {
                id: "1-6-2",
                label: "Land Surface Models",
                selected: false,
                expanded: false,
              },
              {
                id: "1-6-3",
                label: "Ocean Models",
                selected: false,
                expanded: false,
              },
              {
                id: "1-6-4",
                label: "Ice-Snow Models",
                selected: false,
                expanded: false,
              },
              {
                id: "1-6-5",
                label: "Soild Earth Models",
                selected: false,
                expanded: false,
              },
            ],
          },
          {
            id: "1-7",
            label: "GIS Analysis Models",
            selected: false,
            expanded: false,
            children: [
              {
                id: "1-7-1",
                label: "Data Management Models",
                selected: false,
                expanded: false,
              },
              {
                id: "1-7-2",
                label: "Geostatistical Analysis Models",
                selected: false,
                expanded: false,
              },
              {
                id: "1-7-3",
                label: "Spatial Analysis Models",
                selected: false,
                expanded: false,
              },
              {
                id: "1-7-4",
                label: "3D Analysis Models",
                selected: false,
                expanded: false,
              },
            ],
          },
        ],
      },
    ],
  },
  localAttribute: {
    tabs: [
      {
        id: 1,
        language: "English",
        localName: "",
        wiki: "",
        keywords: "",
        abstract: "",
        mechanism: [],
        application: {
          spatiotemporalScale: "Global",
          stepLength: [
            { dimension: "X", min: "", max: "", unit: "" },
            { dimension: "Y", min: "", max: "", unit: "" },
            { dimension: "Z", min: "", max: "", unit: "" },
            { dimension: "T", min: "", max: "", unit: "" },
          ],
          scope: {
            regionName: "",
            xMin: "",
            xMax: "",
            yMin: "",
            yMax: "",
            spatialRef: "",
          },
        },
      },
    ],
  },
  authors: {
    list: [],
  },
  behavior: {
    states: [
      {
        id: crypto.randomUUID(),
        name: "state1",
        type: "basic",
        description: "",
        transitions: [],
        events: [
          {
            name: "Event1",
            type: "response(input)",
            optional: "False",
            description: "",
          },
        ],
      },
    ],
  },
  runtime: {
    info: {
      name: "",
      version: "",
      baseDir: "",
      entryFile: null,
    },
    hardware: [
      {
        configures: "CPU",
        min: "",
        max: "",
      },
    ],
    software: [
      {
        environment: "Windows",
        platform: "",
        value: "",
      },
    ],
    assemblies: [
      {
        name: "",
        path: "",
      },
    ],
    resources: [
      {
        type: "",
        name: "",
      },
    ],
  },
};

// 创建 store
export const moduleData = writable<ModuleData>(initialData);

// 辅助函数：更新特定模块的数据
export function updateModuleData(module: keyof ModuleData, data: any) {
  moduleData.update((store) => ({
    ...store,
    [module]: data,
  }));
}
