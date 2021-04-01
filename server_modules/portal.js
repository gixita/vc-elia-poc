module.exports = class Portal 
{
    constructor(base_uri, view_folder) 
    {
        this.base_uri = base_uri;
        this.view_folder = view_folder;
    }
  
    regApp(app) 
    {
      app.get('/' + this.base_uri + '/index', (req, res) => {
          console.log("here is the portal");
          res.render(this.view_folder + '/index')
      });

      //app.use(express.static(__dirname + '/' + this.view_folder + '/Elia_files'));
    }
};