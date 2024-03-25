function getProduct_Line(obj, lang) {
  let arr = [];
  obj.map((item) => {
    if (arr.indexOf(item.Product_Line_zh) == -1 && lang === "zh") {
      arr.push(item.Product_Line_zh);
    } else if (arr.indexOf(item.Product_Line_en) == -1 && lang === "en") {
      arr.push(item.Product_Line_en);
    }
  });
  return arr;
}

function getProduct_Name(obj, lang) {
  let o = {};

  obj.map((item, idx) => {
    if (lang === "zh") {
      o[item.Product_Line_zh] = null;
    } else if (lang === "en") {
      o[item.Product_Line_en] = null;
    }
  });
  Object.keys(o).map((item1, idx) => {
    let arr = [];
    obj.map((item2, idx) => {
      if (lang === "zh") {
        if (item2.Product_Line_zh === item1) {
          arr.push(item2.product_name_zh);
        }
        o[item1] = arr;
      } else if (lang === "en") {
        if (item2.Product_Line_en === item1) {
          arr.push(item2.product_name_en);
        }
        o[item1] = arr;
      }
    });
  });
  return o;
}

function getProduct_doc(obj, str, lang) {
  let arr = [];
  obj.map((item, idx) => {
    if (lang === "zh") {
      if (item.product_name_zh === str) {
        arr.push(...item.docs);
      }
    } else if (lang === "en") {
      if (item.product_name_en === str) {
        arr.push(...item.docs);
      }
    }
  });
  return arr;
}

export { getProduct_Line, getProduct_Name, getProduct_doc };
