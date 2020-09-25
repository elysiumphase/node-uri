# CHANGELOG

- fix parser to support ipv6 extraction (parse and recompose)
- add href attribute when parsing uri
- fix punycode and punydecode that should work with ipv6
- fix " characters not allowed in any uri
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
