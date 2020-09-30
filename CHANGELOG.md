# CHANGELOG

## 1.1.0 - delivery @29/09/2020

- fix parser to support IPv6 extraction (parse and recompose)
- add href attribute when parsing URI
- fix punycode and punydecode that should work with IPv6
- fix " (quote) character not allowed in any URI
- fix sitemap characters
- remove checkURISyntax from API
- change recomposeURI to ignore port, userinfo, query and fragment if not valid
- add max URL length at 2048
- userinfo chars accept A-Z

## 1.0.1 - delivery @22/09/2020

- docs:
  - update project description
  - add missing github community files

## 1.0.0 - delivery @21/09/2020

- first delivery
