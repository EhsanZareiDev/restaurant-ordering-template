export const validateField = (fieldName, value, rules) => {
  const rule = rules[fieldName];

  if (!rule) return null;

  const trimmedValue = value?.trim() ?? "";

  // Required Validation
  if (rule.required) {
    const isRequired =
      typeof rule.required === "function"
        ? rule.required()
        : rule.required;

    if (isRequired && !trimmedValue) {
      return rule.requiredMessage;
    }
  }

  if (!trimmedValue) {
    return null;
  }

  // Min Length Validation
  if (rule.minLength && trimmedValue.length < rule.minLength) {
    return rule.minLengthMessage;
  }

  // Regex Validation
  if (rule.regex && !rule.regex.test(trimmedValue)) {
    return rule.regexMessage;
  }

  return null;
};

export const validateForm = (formData, rules) => {
  const errors = {};

  for (const [fieldName, value] of Object.entries(formData)) {
    const error = validateField(fieldName, value, rules);

    if (error) {
      errors[fieldName] = error;
    }
  }

  return errors;
};