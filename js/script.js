var app = new function() {

  this.el = document.getElementById('refeicao-list');

  this.countries = [{"label":'Hambúguer'}, 
                    {"label":'Pizza'}, 
                    {"label":'Hot Dog'}, 
                    {"label":'Comida Mexicana'}, 
                    {"label":'Comida Japonesa'}, 
                    {"label":'Churrasco'}, 
                    {"label":'Comida Italiana'}, 
                    {"label":'Sandwich'}];
  
  this.FetchAll = function() {
    var data = '';


    if (this.countries.length > 0) {
      for (i = 0; i < this.countries.length; i++) {
        data += '<tr>';
        data += '<td><b>' + this.countries[i].label + '</b></td>';
        data += '<td><button onclick="app.Edit(' + i + ')" class="btn btn-labeled btn-primary"><span class="btn-label"><i class="glyphicon glyphicon-pencil"></i></span></button>  ';
        data += '<button onclick="app.Delete(' + i + ')" class="btn btn-labeled btn-danger"><span class="btn-label"><i class="glyphicon glyphicon-remove"></i></span></button> </td>';
        data += '</tr>';
      }
    }
    return this.el.innerHTML = data;
  };

  this.Add = function () {
    el = document.getElementById('add-name');
    // Get the value
    var country = {"label": el.value};

    if (country) {
      // Add the new value
      this.countries.push(country);
      // Reset input value
      el.value = '';
      // Dislay the new list
      this.FetchAll();
    }
  };

  this.Edit = function (item) {
    var el = document.getElementById('edit-name');
    // Display value in the field
    el.value = this.countries[item].label;
    // Display fields
    document.getElementById('spoiler').style.display = 'block';
    self = this;

    document.getElementById('saveEdit').onsubmit = function() {
      // Get value
      var country = {"label": el.value};

      if (country) {
        // Edit value
        self.countries.splice(item, 1, country);
        // Display the new list
        self.FetchAll();
        // Hide fields
        CloseInput();
      }
    }
  };

  this.Delete = function (item) {
    // Delete the current row
    this.countries.splice(item, 1);
    // Display the new list
    this.FetchAll();
  };
  
}

app.FetchAll();

function CloseInput() {
  document.getElementById('spoiler').style.display = 'none';
}  

function teste(){
    if(app.countries.length == 0){
        alert('Adicione ao menos uma refeição.');
    }else{
        createChart();
      }
}

teste();