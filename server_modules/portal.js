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
            res.render(this.view_folder + '/index')
        });
    }
};