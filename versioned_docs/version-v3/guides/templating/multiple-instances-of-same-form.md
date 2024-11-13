---
sidebar_position: 5
---

# Multiple Instances of the Same Form

You certainly can have more than 1 Freeform form loaded in the same page. However, in some cases you may run into issues when doing so, such as [AJAX](../../guides/templating/ajax-forms) not working correctly or some special fields not loading correctly.

## Instructions

If you experience any issues (or would like to prevent any from potentially occuring), you can do so by following these best practices:

- Be sure to specify the [id](../../templates/queries/form#id) parameter for the _Form query_ in your template with unique values.
- Be sure to use the [fieldIdPrefix](../../templates/queries/form#fieldidprefix) parameter for the _Form query_ in your template with unique values. This will automatically insert unique prefix values to field ID's rendered with _field.render_ so you don't have to manually do this.

### Example

```twig showLineNumbers {5-8,11-14}
<html>
<head></head>
<body>
    <h1>First Instance of Form</h1>
    {{ freeform.form("myFormHandle").render({
        id: "form-one",
        fieldIdPrefix: "form-one-"
    }) }}

    <h1>Second Instance of Form</h1>
    {{ freeform.form("myFormHandle").render({
        id: "form-two",
        fieldIdPrefix: "form-two-"
    }) }}
</body>
</html>
```
