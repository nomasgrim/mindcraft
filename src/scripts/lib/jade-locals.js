define(['underscore'], function(_) {

  var jadeLocals = {_:_};

  // Matches "./" preceded by either start of string (^) or "/" (\/).
  // Captures preceding element as either '/' or ''.
  var dotSlashRegex = /(^|\/)\.\//g;
  // Prune & keep preceding slashes by replacing with capture group.
  function pruneDotSlash(url) {
    return url && url.replace(dotSlashRegex, '$1');
  }

  jadeLocals.pruneDotSlash = pruneDotSlash;

  // Matches leading slash
  var leadingSlashRegex = /^\//;
  // Trim leading slash.
  function trimLeadingSlash(url) {
    return url && url.replace(leadingSlashRegex, '');
  }

  // Matches trailing slash
  var trailingSlashRegex = /\/$/;
  // Trim trailing slash.
  function trimTrailingSlash(url) {
    return url && url.replace(trailingSlashRegex, '');
  }

  var trimSlashes = _.compose(trimLeadingSlash, trimTrailingSlash);

  jadeLocals.trimLeadingSlash = trimLeadingSlash;
  jadeLocals.trimTrailingSlash = trimTrailingSlash;
  jadeLocals.trimSlashes = trimSlashes;

  return jadeLocals;
});
