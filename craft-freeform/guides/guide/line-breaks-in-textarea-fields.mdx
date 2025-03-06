---
sidebar_position: 4
---

# Line Breaks in Textarea Fields

Textarea fields store data in the database as newlines. When displaying submission data in [email notifications](../../forms/email-notifications.mdx) or on the front end with a [Submissions query](../../templates/queries/submissions.mdx), the newlines will not be respected and render as a single clump of text with Twig.

## Instructions

To get textarea fields to display correctly with the line breaks, you can use the `nl2br` Twig filter:

```
{{ myFieldHandle|nl2br }}
```

```
{{ submission[field.handle]|nl2br }}
```

### Email Notifications

How this may look when displaying submission data in an [email notification](../../forms/email-notifications.mdx) template when iterating through all fields:

```twig {4-6}
<p>Submitted on: {{ dateCreated|date('l, F j, Y \\a\\t g:ia') }}</p>
<ul>
{% for field in allFields %}
    {% if field.type == "textarea" %}
        {{ field.value|nl2br }}
    {% else %}
        <li>{{ field.label }}: {{ field.valueAsString }}</li>
    {% endif %}
{% endfor %}
</ul>
```

### Submissions on Front End

How this may look when displaying submission data for a single submission [on the front end](../../templates/queries/submissions.mdx) (assuming the ID is in 3rd segment) when iterating through all fields:

```twig {11-13}
{% set submissionId = craft.app.request.segment(3) %}
{% set submission = freeform.submissions({id: submissionId}).one() %}

{% if submission %}
    <h3>{{ submission.title }}</h3>
    <table class="table table-striped">
    {% for field in submission %}
        <tr>
            <th>{{ field.label ? field.label : "no-label" }}</th>
            <td>
            {% if field.type == "textarea" %}
                {{ submission[field.handle]|nl2br }}
            {% else %}
                {{ submission[field.handle] }}
            {% endif %}
            </td>
        </tr>
    {% endfor %}
    </table>
{% endif %}
```
