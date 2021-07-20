"use stric";
/**
 * The class makes an IBM-watson Natural Language Understanding instance
 *@class
 *@classdesc The additional functions implement the corresponding NLU methods
 */

class NaturalLanguageUnderstanding {
  /**@member {Object} Parameters for request */
  analyzeParams;
  /** @private {Object} Instance of NLU*/
  #nlu;

  /**
   *@param {Object} The required parameter to initialize the instance, including the instance of the autenticator
   *@param {string} The path to required ibm-watson NLU module
   * */
  constructor(initObject, requiredLib) {
    let natLang = require(requiredLib);

    this.#nlu = new natLang(initObject);
  }

  /**
   *@param {Object} respond to send to client
   *In the respond: the entier object from NLU's server
   * */
  getAnalyze(res) {
    this.#nlu
      .analyze(this.analyzeParams)
      .then((emotionRes) => {
        res.send(emotionRes.result);
      })
      .catch((err) => {
        console.log("Error occured:", err);
      });
  }

  /**
   *@param {Object} respond to send to client
   *In the respond: emotionResult.result.emotion.document.emotion from NLU's server
   * */
  getDocumentEmotion(res) {
    this.#nlu
      .analyze(this.analyzeParams)
      .then((emotionRes) => {
        res.send(emotionRes.result.emotion.document.emotion);
      })
      .catch((err) => {
        console.log("Error occured:", err);
      });
  }

  /**
   *@param {Object} respond to send to client
   *In the respond: sentimentResult.result.document.label from NLU's server
   * */
  getSentimentLabel(res) {
    this.#nlu
      .analyze(this.analyzeParams)
      .then((sentimentRes) => {
        res.send(sentimentRes.result.sentiment.document.label);
      })
      .catch((err) => {
        console.log("Error occured:", err);
      });
  }
}

module.exports = NaturalLanguageUnderstanding;
