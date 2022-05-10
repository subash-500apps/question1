var crudApp = new (function () {
  this.myproducts = [
    { ID: "1", Firstname: "Agile", subscription: "yes", Lastname: "CRM" },
    { ID: "2", Firstname: "Ninja", subscription: "yes", Lastname: "HR" },
    { ID: "3", Firstname: "Feed", subscription: "yes", Lastname: "Backup" },
  ];

  this.Lastname = ["yes", "no"];
  this.col = [];

  this.createTable = function () {
    // Extract value for table header.
    for (var i = 0; i < this.myproducts.length; i++) {
      for (var key in this.myproducts[i]) {
        if (this.col.indexOf(key) === -1) {
          this.col.push(key);
        }
      }
    }

    var table = document.createElement("table");
    table.setAttribute("id", "productsTable"); // Seet table id.

    var tr = table.insertRow(-1); // Create a row (for header).

    for (var h = 0; h < this.col.length; h++) {
      // Add table header.
      var th = document.createElement("th");
      th.innerHTML = this.col[h].replace("_", " ");
      tr.appendChild(th);
    }

    for (var i = 0; i < this.myproducts.length; i++) {
      tr = table.insertRow(-1); // Create a new row.

      for (var j = 0; j < this.col.length; j++) {
        var tabCell = tr.insertCell(-1);
        tabCell.innerHTML = this.myproducts[i][this.col[j]];
      }

      this.td = document.createElement("td");

      // *** CANCEL OPTION.
      tr.appendChild(this.td);
      var lblCancel = document.createElement("label");
      lblCancel.innerHTML = "✖";
      lblCancel.setAttribute("onclick", "crudApp.Cancel(this)");
      lblCancel.setAttribute("style", "display:none;");
      lblCancel.setAttribute("title", "Cancel");
      lblCancel.setAttribute("id", "lbl" + i);
      this.td.appendChild(lblCancel);

      // *** SAVE.
      tr.appendChild(this.td);
      var btSave = document.createElement("input");

      btSave.setAttribute("type", "button"); // SET ATTRIBUTES.
      btSave.setAttribute("value", "Save");
      btSave.setAttribute("id", "Save" + i);
      btSave.setAttribute("style", "display:none;");
      btSave.setAttribute("onclick", "crudApp.Save(this)");
      this.td.appendChild(btSave);

      // *** UPDATE.
      tr.appendChild(this.td);
      var btUpdate = document.createElement("input");

      btUpdate.setAttribute("type", "button"); // SET ATTRIBUTES.
      btUpdate.setAttribute("value", "Update");
      btUpdate.setAttribute("id", "Edit" + i);
      btUpdate.setAttribute("style", "background-color:#44CCEB;");
      btUpdate.setAttribute("onclick", "crudApp.Update(this)"); // ADD THE BUTTON's 'onclick' EVENT.
      this.td.appendChild(btUpdate);

      tr = table.insertRow(-1); // CREATE THE LAST ROW.
      for (var j = 0; j < this.col.length; j++) {
        var newCell = tr.insertCell(-1);
        if (j >= 1) {
          if (j == 2) {
            var select = document.createElement("select");
            select.innerHTML = '<option value=""></option>';
            for (k = 0; k < this.Lastname.length; k++) {
              select.innerHTML = select.innerHTML + '<option value="' + this.Lastname[k] + '">' + this.Lastname[k] + "</option>";
            }
            newCell.appendChild(select);
          } else {
            var tBox = document.createElement("input"); // CREATE AND ADD A TEXTBOX.
            tBox.setAttribute("type", "text");
            tBox.setAttribute("value", "");
            newCell.appendChild(tBox);
          }
        }
      }

      this.td = document.createElement("td");
      tr.appendChild(this.td);

      var btNew = document.createElement("input");

      btNew.setAttribute("type", "button"); // SET ATTRIBUTES.
      btNew.setAttribute("value", "Create");
      btNew.setAttribute("id", "New" + i);
      btNew.setAttribute("style", "background-color:#207DD1;");
      btNew.setAttribute("onclick", "crudApp.CreateNew(this)"); // ADD THE BUTTON's 'onclick' EVENT.
      this.td.appendChild(btNew);

      var div = document.getElementById("container");
      div.innerHTML = "";
      div.appendChild(table); // ADD THE TABLE TO THE WEB PAGE.
    }

    // SHOW THE UPDATE BUTTON AGAIN.
    var btUpdate = document.getElementById("Edit" + (activeRow - 1));
    btUpdate.setAttribute("style", "display:block; margin:0 auto; background-color:#44CCEB;");

    var tab = document.getElementById("productsTable").rows[activeRow];

    for (i = 0; i < this.col.length; i++) {
      var td = tab.getElementsByTagName("td")[i];
      td.innerHTML = this.myproducts[activeRow - 1][this.col[i]];
    }
  };

  // EDIT DATA.
  this.Update = function (oButton) {
    var activeRow = oButton.parentNode.parentNode.rowIndex;
    var tab = document.getElementById("productsTable").rows[activeRow];

    // SAVE DATA.
    this.Save = function (oButton) {
      var activeRow = oButton.parentNode.parentNode.rowIndex;
      var tab = document.getElementById("productsTable").rows[activeRow];

      // UPDATE myproducts ARRAY WITH VALUES.
      for (i = 1; i < this.col.length; i++) {
        var td = tab.getElementsByTagName("td")[i];
        if (td.childNodes[0].getAttribute("type") == "text" || td.childNodes[0].tagName == "SELECT") {
          // CHECK IF ELEMENT IS A TEXTBOX OR SELECT.
          this.myproducts[activeRow - 1][this.col[i]] = td.childNodes[0].value; // SAVE THE VALUE.
        }
      }
      this.createTable(); // REFRESH THE TABLE.
    };

    // CREATE NEW.
    this.CreateNew = function (oButton) {
      var activeRow = oButton.parentNode.parentNode.rowIndex;
      var tab = document.getElementById("productsTable").rows[activeRow];
      var obj = {};

      // ADD NEW VALUE TO myproducts ARRAY.
      for (i = 1; i < this.col.length; i++) {
        var td = tab.getElementsByTagName("td")[i];
        if (td.childNodes[0].getAttribute("type") == "text" || td.childNodes[0].tagName == "SELECT") {
          // CHECK IF ELEMENT IS A TEXTBOX OR SELECT.
          var txtVal = td.childNodes[0].value;
          if (txtVal != "") {
            obj[this.col[i]] = txtVal.trim();
          } else {
            obj = "";
            alert("all fields are compulsory");
            break;
          }
        }
      }
    };
  };
  crudApp.createTable();
})();
