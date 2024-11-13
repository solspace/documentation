---
sidebar_position: 6
---

# Returning Submit to Same Page

Aside from the obvious of using [AJAX](./ajax-forms), you can achieve this by adding a query in the success URL instead of an additional segment, etc.

```twig {1-3,6} showLineNumbers
{% if craft.app.request.getQueryParam('success') == 1 %}
  <div class="callout success">Your message has been sent.</div>
{% endif %}

  {{ craft.freeform.form("contactForm", {
      returnUrl: "/contact?success=1",
      submitClass: "button",
    }
  ).render() }}

{% endif %}
```

Or a different option, simply redirecting to `/contact?success`:

```twig showLineNumbers
{% set successParam = craft.app.request.getParam('success') %}
{% if successParam is not null %}
  <p>Success!!</p>
{% endif %}
```

And in case you're looking for a dynamic way of setting a return URL with combining several segments:

```twig showLineNumbers
{% set returnUrlPath = siteUrl ~ "get-quote/" ~ craft.app.request.getSegment(2) ~ "?success=1" %}
```
