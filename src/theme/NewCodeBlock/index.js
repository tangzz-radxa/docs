import React from "react";
import PropTypes from "prop-types";
import styles from "./index.module.css";

const NewCodeBlock = (props) => {
  // 确保 type 是明确传入的，而不是依赖默认值
  const { tip, promptPrefix: userPromptPrefix, showPrompt } = props;
  const type = props.type || "";

  // Only set promptPrefix if type is provided or use tip as promptPrefix
  let promptPrefix = userPromptPrefix;
  if (!promptPrefix) {
    if (tip && tip.trim() !== "") {
      promptPrefix = tip; // Use tip as promptPrefix if available
    } else if (type) {
      promptPrefix = type === "device" ? "root@radxa#" : "linux-host$";
    }
  }
  // Apply different classes based on type (host/device)
  // 只有在有 type 参数时才应用相应的样式
  const superscriptClass = type
    ? type === "device"
      ? styles.superscriptDevice
      : styles.superscript
    : styles.superscript;

  // Validate that code block exists
  if (!props.children || !props.children.props) {
    console.error("NewCodeBlock: Invalid code block structure", props.children);
    return (
      <div className={styles.textBox}>
        <div className={styles.tippre}>
          <pre>
            <code>
              请补充code内容，code不能为空，内容格式参考: &lt;NewCodeBlock
              tip='Your text'&gt; ``` Your Content ``` &lt;/NewCodeBlock&gt;
            </code>
          </pre>
        </div>
      </div>
    );
  }

  // 确定是否应该显示提示符，以及第一个非空命令行
  const findFirstCommand = () => {
    if (!showPrompt || !promptPrefix) {
      return null;
    }

    try {
      // 获取预元素（通常是 <pre>）
      const preElement = props.children;
      if (!preElement || !preElement.props) return null;

      // 尝试提取代码文本
      let codeText = null;

      // 情况1：直接的 pre > code 结构
      if (
        preElement.props.children?.props?.children &&
        typeof preElement.props.children.props.children === "string"
      ) {
        codeText = preElement.props.children.props.children;
      }
      // 情况2：pre 包含多个子元素
      else if (preElement.props.children) {
        const children = Array.isArray(preElement.props.children)
          ? preElement.props.children
          : [preElement.props.children];

        for (const child of children) {
          if (
            child?.props?.children &&
            typeof child.props.children === "string"
          ) {
            codeText = child.props.children;
            break;
          }
        }
      }

      // 如果没有找到有效的代码文本，返回空
      if (!codeText) return null;

      // 查找第一个非空命令行
      const codeLines = codeText.split("\n");
      for (const line of codeLines) {
        const trimmedLine = line.trim();
        if (
          trimmedLine &&
          !trimmedLine.startsWith("$") &&
          !trimmedLine.startsWith("#") &&
          !trimmedLine.startsWith(">")
        ) {
          return trimmedLine;
        }
      }

      return null; // 没有找到合适的命令行
    } catch (error) {
      console.error("查找命令行时出错:", error);
      return null;
    }
  };

  // 获取第一个可用的命令行
  const firstCommand = findFirstCommand();

  // 确定提示符样式类，只有在 type 存在时才使用特殊样式，否则使用默认样式
  const promptStyleClass = type
    ? type === "device"
      ? styles.promptDevice
      : styles.promptHost
    : styles.promptHost;

  // Add custom class to children to allow for deeper styling control
  let enhancedChildren = props.children;
  if (props.children && props.children.props) {
    enhancedChildren = React.cloneElement(props.children, {
      className: `${props.children.props.className || ""} ${
        styles.noBottomBorder
      }`,
    });
  }

  return (
    <div className={styles.textBox}>
      <div className={styles.codeWrapper}>
        {showPrompt && promptPrefix && (
          <div className={`${styles.promptPrefix} ${promptStyleClass}`}>
            {promptPrefix}
          </div>
        )}
        <div className={styles.tippre}>{enhancedChildren}</div>
      </div>
    </div>
  );
};

NewCodeBlock.propTypes = {
  tip: PropTypes.string,
  type: PropTypes.oneOf(["host", "device"]), // 只允许有效的类型值
  promptPrefix: PropTypes.string,
  showPrompt: PropTypes.bool,
};
NewCodeBlock.defaultProps = {
  tip: "", // 默认为空字符串，不显示任何标签
  type: undefined, // 默认不设置 type，确保不显示提示符
  promptPrefix: undefined, // Will be automatically set based on type
  showPrompt: true, // Default to showing prompt
};

export default NewCodeBlock;
