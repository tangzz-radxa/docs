import React from "react";
import PropTypes from "prop-types";
import styles from "./index.module.css";

const NewCodeBlock = (props) => {
  // 确保 type 是明确传入的，而不是依赖默认值
  const { tip, promptPrefix: userPromptPrefix, showPrompt } = props;
  const type = props.type || "device";

  // Only set promptPrefix if type is provided or use tip as promptPrefix
  let promptPrefix = userPromptPrefix;
  if (!promptPrefix) {
    if (tip && tip.trim() !== "") {
      promptPrefix = tip; // Use tip as promptPrefix if available
    } else if (type) {
      promptPrefix = type === "device" ? "root@radxa#" : "linux-host$";
    }
  }

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
        <div className={styles.tippre}>
          {promptPrefix ? (
            <div className={`${styles.promptPrefix} ${promptStyleClass}`}>
              {promptPrefix}
            </div>
          ) : null}
          {enhancedChildren}
        </div>
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
