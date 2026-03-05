---
name: openspec-archive-change
description: 归档实验性工作流中已完成的变更。当用户想要在实施完成后最终确定并归档变更时使用。
license: MIT
compatibility: 需要 openspec CLI。
metadata:
  author: openspec
  version: "1.0"
  generatedBy: "1.2.0"
---

归档实验性工作流中已完成的变更。

**输入**: 可选地指定变更名称。如果省略，检查是否可以从对话上下文中推断出来。如果模糊或不明确，必须提示用户选择可用变更。

**步骤**

1. **如果没有提供变更名称，提示选择**

   运行 `openspec list --json` 获取可用变更。使用 **AskUserQuestion tool** 让用户选择。

   仅显示活动变更（未归档的）。
   包含每个变更使用的模式（如果可用）。

   **重要**: 不要猜测或自动选择变更。始终让用户选择。

2. **检查工件完成状态**

   运行 `openspec status --change "<name>" --json` 检查工件完成情况。

   解析 JSON 以了解：
   - `schemaName`: 正在使用的模式
   - `artifacts`: 带有状态（`done` 或其他）的工件列表

   **如果有任何工件未 `done`：**
   - 显示列出未完成工件的警告
   - 使用 **AskUserQuestion tool** 确认用户是否继续
   - 如果用户确认，继续

3. **检查任务完成状态**

   读取任务文件（通常是 `tasks.md`）检查未完成的任务。

   统计标记为 `- [ ]`（未完成）与 `- [x]`（已完成）的任务。

   **如果发现未完成的任务：**
   - 显示未完成任务计数的警告
   - 使用 **AskUserQuestion tool** 确认用户是否继续
   - 如果用户确认，继续

   **如果不存在任务文件：** 继续，无任务相关警告。

4. **评估增量规范同步状态**

   检查 `openspec/changes/<name>/specs/` 是否存在增量规范。如果不存在，继续，无需同步提示。

   **如果存在增量规范：**
   - 将每个增量规范与 `openspec/specs/<capability>/spec.md` 中的对应主规范进行比较
   - 确定将应用哪些更改（添加、修改、删除、重命名）
   - 在提示之前显示合并摘要

   **提示选项：**
   - 如果需要更改："Sync now (recommended)"（立即同步 - 推荐），"Archive without syncing"（归档不同步）
   - 如果已同步："Archive now"（立即归档），"Sync anyway"（无论如何同步），"Cancel"（取消）

   如果用户选择同步，使用 Task tool（subagent_type: "general-purpose", prompt: "Use Skill tool to invoke openspec-sync-specs for change '<name>'. Delta spec analysis: <include the analyzed delta spec summary>"). 无论选择如何，继续归档。

5. **执行归档**

   如果归档目录不存在，创建它：
   ```bash
   mkdir -p openspec/changes/archive
   ```

   使用当前日期生成目标名称：`YYYY-MM-DD-<change-name>`

   **检查目标是否已存在：**
   - 如果是：失败并报错，建议重命名现有归档或使用不同日期
   - 如果否：将变更目录移动到归档

   ```bash
   mv openspec/changes/<name> openspec/changes/archive/YYYY-MM-DD-<name>
   ```

6. **显示摘要**

   显示归档完成摘要，包括：
   - 变更名称
   - 使用的模式
   - 归档位置
   - 规范是否已同步（如果适用）
   - 关于任何警告的说明（未完成的工件/任务）

**成功时的输出**

```
## Archive Complete

**Change:** <change-name>
**Schema:** <schema-name>
**Archived to:** openspec/changes/archive/YYYY-MM-DD-<name>/
**Specs:** ✓ Synced to main specs (or "No delta specs" or "Sync skipped")

All artifacts complete. All tasks complete.
```

**护栏**
- 如果未提供，始终提示选择变更
- 使用工件图（openspec status --json）进行完成检查
- 不要因警告阻止归档 - 只是通知并确认
- 移动到归档时保留 .openspec.yaml（随目录移动）
- 显示发生的清晰摘要
- 如果请求同步，使用 openspec-sync-specs 方法（代理驱动）
- 如果存在增量规范，始终在提示之前运行同步评估并显示合并摘要
