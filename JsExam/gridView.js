var controls = (function () {
    function gridView(selector) {
        var header = [];
        var rows = [];
        var gridHolder = document.getElementById(selector);
        var gridTable = document.createElement("table");

        this.addHeader = function (p1, p2, p3, p4) {
            var cols = [];
            cols[0] = p1;
            cols[1] = p2;
            cols[2] = p3;
            cols[3] = p4;

            var headerLen = header.length;
            if (headerLen === 0) {
                var newHeader = new Header(cols);
                header.push(newHeader);
                headerLen++;
                return newHeader;
            }

            return;
        };

        this.addRow = function (p1, p2, p3, p4) {
            var cols = [];
            cols[0] = p1;
            cols[1] = p2;
            cols[2] = p3;
            cols[3] = p4;

            var newRow = new Row(cols);
            rows.push(newRow);
            return newRow;
        }

        this.render = function () {
            var gridHeader = header[0].render();
            gridTable.appendChild(gridHeader);

            for (var i = 0; i < rows.length; i++) {
                gridTable.appendChild(rows[i].render());
            }

            gridHolder.appendChild(gridTable);
        }

        gridHolder.addEventListener("click", function(ev){
            var clickedRow = ev.target;
            
            if (!ev) {
                ev = window.event;
            }

            var subGrid = clickedRow.nextElementSibling;
           if (!subGrid) {
                return;
            }

            if (subGrid) {
                if (subGrid.style.display === "none") {
                    subGrid.style.display = "";
                } else {
                    subGrid.style.display ="none";
                }
            }

            ev.stopPropagation();
            ev.preventDefault();
        }, false);

        this.serialize = function() {
            var serializedItems = [];
            for (var i = 0; i < rows.length; i += 1) {
               serializedItems.push(rows[i].serialize());
            }
            return serializedItems;
        }
    }

    function Header(params) {
        var cols = params;

        this.render = function () {
            var headerItem = document.createElement("tr");
            headerItem.setAttribute("id", "header");
            if (cols.length > 0) {
                for (var i = 0; i < cols.length; i++) {
                    if (cols[i] !== undefined) {
                        var cellItem = document.createElement("td");
                        cellItem.innerHTML = cols[i];
                        headerItem.appendChild(cellItem);
                    }
                }
            }

            this.serialize = function() {
                var thisItem = {
                    
                };
                if (cols.length > 0) {
                    var serializedItems = [];
                for (var i = 0; i < cols.length; i += 1) {
                    var serItem = cols[i].serialize();
                    serializedItems.push(serItem);
                }
                    thisItem.items = serializedItems;
                }
                    return thisItem;
            }

            return headerItem;
        }
    }

    function Row(params) {
        var cols = params;
        var header = [];
        var innerRows = [];
        this.render = function () {
            var rowItem = document.createElement("tr");

            //renders the initial table rows
            for (var i = 0; i < cols.length; i++) {
                if (cols[i] !== undefined) {
                    var cellItem = document.createElement("td");
                    cellItem.innerHTML = cols[i];
                    rowItem.appendChild(cellItem);
                }
            }

            //renders inner stuff
            if (innerRows.length > 0) {
                var innerTable = document.createElement("table");
                innerTable.setAttribute("id","innerTable");
                var innerRow = document.createElement("tr");
                if (header.length > 0) {
                    var innerHeader = header[0].render();
                    innerTable.appendChild(innerHeader);
                }
                for (var i = 0; i < innerRows.length; i++) {
                    var currRow = innerRows[i].render();
                    innerTable.appendChild(currRow);
                }
                innerTable.style.display = "none";
                rowItem.appendChild(innerTable);
            }
            return rowItem;
        }

        this.addRow = function (p1, p2, p3, p4) {
            var innerCols = [];
            innerCols[0] = p1;
            innerCols[1] = p2;
            innerCols[2] = p3;
            innerCols[3] = p4;

            var newRow = new Row(innerCols);
            innerRows.push(newRow);
            return newRow;
        }

        this.addHeader = function(p1, p2, p3, p4){
            var innerCols = [];
            innerCols[0] = p1;
            innerCols[1] = p2;
            innerCols[2] = p3;
            innerCols[3] = p4;

            var newHeader = new Header(innerCols);
            header.push(newHeader);
            return newHeader;
        }

        this.serialize = function() {
              var thisRow= {
              };
                 if (cols.length > 0) {
                       var serializedItems = [];
                 for (var i = 0; i < cols.length; i += 1) {
                    var serRow = cols[i].serialize();
                   serializedItems.push(serItem);
                 }
                  thisRow.cols = serializedItems;
                }
            return thisRow;
        }
    }

    return {
        getGridView: function (selector) {
            return new gridView(selector);
        }

    }
}());