---
sidebar_position: 5
---

# Multiple Instances of the Same Form

You certainly can have more than one Freeform form loaded in the same page. However, in some cases you may run into issues when doing so, such as [AJAX](../../guides/templating/ajax-forms.mdx) not working correctly or some special fields not loading correctly.

## Instructions

If you experience any issues (or would like to prevent any from potentially occuring), you can do so by following these best practices:

- Be sure to specify `id` under the [attributes](../../templates/queries/form.mdx#template-overrides) parameter for the _Form query_ in your template with unique values.
- Be sure to use the [fieldIdPrefix](../../templates/queries/form.mdx#fieldidprefix) parameter for the _Form query_ in your template with unique values. This will automatically insert unique prefix values to field ID's rendered with _field.render_ so you don't have to manually do this.

### Example

```twig {6-9,14-17}
<html>
<head></head>
<body>
    <h1>First Instance of Form</h1>
    {{ freeform.form("myFormHandle").render({
        attributes: {
            id: "form-one",
        },
        fieldIdPrefix: 'myform-one-',
    }) }}

    <h1>Second Instance of Form</h1>
    {{ freeform.form("myFormHandle").render({
        attributes: {
            id: "form-two",
        },
        fieldIdPrefix: 'myform-two-',
    }) }}
</body>
</html>
```