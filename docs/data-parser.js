/**
 * This is intended for injecting into a live site and pulling a JSON dump of their menu.
 */
function parseMenu() {
  var categoryElements = $('#VendorMenu>.category');

  var categoriesArray = Array.prototype.map.call(categoryElements, function (elem) {
    elem = $(elem);

    var items = elem.find('.item');
    var sectionTitle = elem.find('>h3').html();

    if (sectionTitle) {
      sectionTitle = sectionTitle.trim();

      var itemsArray = Array.prototype.map.call(items, function (item) {
        item = $(item);

        var title = item.find('.name').html();
        var description = item.find('.description').html();
        var price = item.find('.price').html();

        if (title) {
          title = title.trim();
          description = description && description.trim() || null;
          price = price && price.trim().replace('$', '') || null;

          return {
            "title": title,
            "description": description,
            "price": parseFloat(price),
            "image-url": "../img/spaghetti.jpg"
          };
        } else {
          return null;
        }
      });

      return {
        "title": sectionTitle,
        "items": itemsArray
      };
    } else {
      return null;
    }
  });

  console.info(categoriesArray);
  console.log(JSON.stringify(categoriesArray));
}
