const router = require("express").Router();
const axios = require("axios");
const cheerio = require("cheerio");

//GET DETAILS
router.get("/:id", async (req, res) => {
  const queried = await req.params.id;

  // Capitalized the query parameter so as to expect identical strings
  const convert = queried.toLowerCase();
  function capitalizeFirstLetter(str) {
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
    return capitalized;
  }
  const result = capitalizeFirstLetter(convert);
  const feedback = [];
  axios
    .get(
      "https://golden.com/query/list-of-cryptocurrency-exchange-companies-R9Y4"
    )
    .then((response) => {
      const data = response.data;
      const info = cheerio.load(data);

      info(`a:contains('${result}')`, data).each(function () {
        const url = info(this).attr("href");
        const name = info(this).text();
        feedback.push({ name, url });
      });
      res.json(feedback[0]);
    })
    .catch((error) => {
      res.status(500).json(error.message);
      console.log(error);
    });
});

module.exports = router;
