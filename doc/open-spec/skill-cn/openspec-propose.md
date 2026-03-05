---
name: openspec-propose
description: 一步生成包含所有工件的新变更提案。当用户想要快速描述他们想要构建的内容并获得包含设计、规范和任务的完整提案以准备实施时使用。
license: MIT
compatibility: 需要 openspec CLI。
metadata:
  author: openspec
  version: "1.0"
  generatedBy: "1.2.0"
---

提出新变更 - 创建变更并一步生成所有工件。

我将创建一个包含以下工件的变更：
- proposal.md (做什么 & 为什么)
- design.md (怎么做)
- tasks.md (实施步骤)

准备好实施时，运行 /opsx:apply

---

**输入**: 用户的请求应包含变更名称（kebab-case 格式）或他们想要构建内容的描述。

**步骤**

1. **如果没有提供明确的输入，询问他们想要构建什么**

   使用 **AskUserQuestion tool**（开放式，无预设选项）询问：
   > "你想进行什么变更？请描述你想构建或修复的内容。"

   根据他们的描述，推导出一个 kebab-case 名称（例如，"添加用户认证" → `add-user-auth`）。

   **重要**: 在理解用户想要构建什么之前，不要继续。

2. **创建变更目录**
   ```bash
   openspec new change "<name>"
   ```
   这将在 `openspec/changes/<name>/` 创建一个包含 `.openspec.yaml` 的脚手架变更。

3. **获取工件构建顺序**
   ```bash
   openspec status --change "<name>" --json
   ```
   解析 JSON 以获取：
   - `applyRequires`: 实施前所需的工件 ID 数组（例如，`["tasks"]`）
   - `artifacts`: 所有工件及其状态和依赖项的列表

4. **按顺序创建工件直到准备好实施 (apply-ready)**

   使用 **TodoWrite tool** 跟踪工件的进度。

   按依赖顺序循环遍历工件（没有未决依赖项的工件优先）：

   a. **对于每个状态为 `ready`（依赖项已满足）的工件**：
      - 获取指令：
        ```bash
        openspec instructions <artifact-id> --change "<name>" --json
        ```
      - 指令 JSON 包括：
        - `context`: 项目背景（对你的约束 - 不要包含在输出中）
        - `rules`: 特定于工件的规则（对你的约束 - 不要包含在输出中）
        - `template`: 用于输出文件的结构
        - `instruction`: 此工件类型的特定模式指导
        - `outputPath`: 写入工件的位置
        - `dependencies`: 已完成的工件，用于阅读上下文
      - 阅读任何已完成的依赖文件以获取上下文
      - 使用 `template` 作为结构创建工件文件
      - 应用 `context` 和 `rules` 作为约束 - 但不要将它们复制到文件中
      - 显示简短进度："Created <artifact-id>"

   b. **继续直到所有 `applyRequires` 工件完成**
      - 创建每个工件后，重新运行 `openspec status --change "<name>" --json`
      - 检查 `applyRequires` 中的每个工件 ID 在 artifacts 数组中是否都具有 `status: "done"`
      - 当所有 `applyRequires` 工件都完成时停止

   c. **如果工件需要用户输入**（上下文不清楚）：
      - 使用 **AskUserQuestion tool** 进行澄清
      - 然后继续创建

5. **显示最终状态**
   ```bash
   openspec status --change "<name>"
   ```

**输出**

完成所有工件后，总结：
- 变更名称和位置
- 已创建的工件列表及其简要说明
- 准备就绪："All artifacts created! Ready for implementation."（所有工件已创建！准备实施。）
- 提示："Run `/opsx:apply` or ask me to implement to start working on the tasks."（运行 `/opsx:apply` 或让我实施以开始处理任务。）

**工件创建指南**

- 遵循每个工件类型的 `openspec instructions` 中的 `instruction` 字段
- 模式定义了每个工件应包含的内容 - 遵循它
- 在创建新工件之前阅读依赖工件以获取上下文
- 使用 `template` 作为输出文件的结构 - 填写其部分
- **重要**: `context` 和 `rules` 是对你的约束，而不是文件的内容
  - 不要将 `<context>`, `<rules>`, `<project_context>` 块复制到工件中
  - 这些指导你写什么，但绝不应出现在输出中

**护栏**
- 创建实施所需的所有工件（由模式的 `apply.requires` 定义）
- 在创建新工件之前始终阅读依赖工件
- 如果上下文严重不清楚，请询问用户 - 但倾向于做出合理的决定以保持势头
- 如果该名称的变更已存在，请询问用户是继续使用它还是创建一个新的
- 在继续下一个之前验证每个工件文件是否存在
