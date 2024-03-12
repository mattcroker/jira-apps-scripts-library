class JiraConnectionHelper {
  static getConnectionSettings(apiKey, authType, domain, userName) {
  
    if (!domain) {
      throw ReferenceError("Domain url left empty. Go to Connection Settings > JIRA Domain");
    }
  
    if (!apiKey) {
      throw ReferenceError("API Key left empty. Go to Connection Settings > API Key");
    }
  
    if (!authType) {
      throw ReferenceError("API Authentication Type left empty. Go to Connection Settings > JIRA Authentication Type");
    }
  
    if (authType === "Basic" &&  !userName) {
      throw ReferenceError("Username required for Basic Authentication Type. Go to Connection Settings > JIRA User Name");
    }
  
    var _key = "";
    if (authType === "Basic") {
      _key = Utilities.base64Encode(`${userName.getValue().toString().trim()}:${apiKey.getValue().toString().trim()}`);
    } else {
      _key = apiKey.getValue()
    }
  
    return {
      method : "GET",
      headers : {
        "Authorization" : `${authType.trim()} ${_key}`,
        "Accept" : "application/json"
      },
      muteHttpExceptions : true
    }
  }
}
