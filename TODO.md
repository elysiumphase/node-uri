# TODO

- J'en suis à:
-> encoders: il va falloir encoder les path, query et fragment selon les caractères autorisés
--> finir dans encoders et écrire les fonctions dans chars (reste pour query et fragment)

sitemap:
- url finale encodée en xml pas plus de 2 048 caractères
- seulement des minuscules hormis percent-encoded
- ni certains codes de contrôle ou caractères spéciaux tels que * et {}
- si xml, encoder les entités

doc:
- ajouter les nouveaux codes d'erreurs pour path, query, fragment

tests:
- nouvelles fonctions: checkPathqf, hostToURI, ...

fix:
- encode et decode: se baser sur les path, query, fragment chars
- checker doc: enlever " et notifier que [] sont pour les IPv6




- test sitemap urls with certain control codes or special characters different from `*`, `{` and `}` are valid when being submitted to Google Console;
- wtach any unsupported feature here: https://url.spec.whatwg.org/;
- add support for relative URIs;
- add support for IRIs;
- add suport for [Secure Shell SSH](https://tools.ietf.org/id/draft-salowey-secsh-uri-00.html) (e.g.: `git@github:xxx/repo.git`).
