---
sidebar_position: 1
---

# Show Submission Data on Success Page

You cannot display POST data on the success return page because that data is cleared upon submission, which is done because for security reasons and preventing forms from being submitted more than once, etc. You can however, consider another approach.

## Instructions

Freeform allows you to [display submissions on the front end](../../templates/objects/submission.mdx). It also allows you to set the return URL to include the future submission ID. You can set this either in the **Return URL** field for the form in the form builder, or at template level like:

```twig showLineNumbers
returnUrl: "{{ siteUrl }}your-page/success/{{ submission.id }}"
```

:::warning
Using this approach can be a security risk as site visitors could try out other ID's in the URL and view submission data for those submissions. It's strongly recommended that you refrain from displaying any sensitive data, but instead use this for anonymous polls or something simple like:
:::

```twig showLineNumbers
Thanks {{ submission.firstName }}, we've received your message and will get back to you shortly!
```

However, if you do wish to include sensitive information, you can consider pairing the submission ID with the Freeform token in the URI. See the [token](../../templates/objects/submission.mdx#token) property in the Submission object and the [token](../../templates/queries/submissions.mdx#token) parameter in the [Submissions query](../../templates/queries/submissions.mdx) for more information. The resulting code would look like:

```twig showLineNumbers
returnUrl: "{{ siteUrl }}your-page/success/{{ submission.id }}/{{ submission.token }}"
```

Or even just:

```twig showLineNumbers
returnUrl: "{{ siteUrl }}your-page/success/{{ submission.token }}"
```

While the Success return page would contain the following:

```twig {2-3} showLineNumbers
{% set submission = freeform.submissions({
    id: craft.app.request.getSegment(3),
    token: craft.app.request.getSegment(4),
    form: 'myFormHandle',
}).one %}
```

Or with token only:

```twig {2} showLineNumbers
{% set submission = freeform.submissions({
    token: craft.app.request.getSegment(3),
    form: 'myFormHandle',
}).one %}
```

You will also likely need to set up a new template route to handle the extra segment(s) in the URI.
