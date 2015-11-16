//get new template to show when button is clicked 'add new'
//get home template to add item to new list once it is clicked
//got my views to actually show up in the console!!!!


///////////////////////////////
///////////////////////////////
//          models           //
///////////////////////////////
///////////////////////////////

//creates a model for the to-do list

var Todo = Backbone.Model.extend({
  url: 'http://tiny-starburst.herokuapp.com/collections/katetodo',
  defaults:{
    //the todo lists attributes and values
    title  : "",
    status : false //because it hasnt been checked off yet
  },
});

///////////////////////////////
///////////////////////////////
//        collections        //
///////////////////////////////
///////////////////////////////

//creates a collection of the todos

var TodoList = Backbone.Collection.extend({
  url: 'http://tiny-starburst.herokuapp.com/collections/katetodo',
  model : Todo,
});

///////////////////////////////
///////////////////////////////
//          views            //
///////////////////////////////
///////////////////////////////

//makes the todo model turn into HTML, and creates a new
//view where we can handle the users ineraction.

var TodoView = Backbone.View.extend({
  template: _.template($('#ListViewTemplate').html()),

  initialize: function(){
    this.listenTo(this.collection, 'change', this.render);
  },

  render: function(){
    this.$el.html(this.template({
      todos: this.collection.toJSON()
    }));
    return this;
  }
});

var HomeView = Backbone.View.extend({
  template: _.template($('#HomeViewTemplate').html()),

  render: function(){
    this.$el.html(this.template());
    return this;
  },
  events: {
    'click .submit'     : 'handleSubmitClick',
    'keypress #newTodo' : 'handleSubmitEnter'
  },
  send: function(){
    var setValue = this.$('#newTodo').val();

    var addTodo = new todo({
      todo : setValue
    });
    addTodo.save();
  },


  // this function will be called after the handleEnter and handleSendClick is run.
  // below is where the input value will be stored to the correct input.

  handleSubmitClick : function(){
    // if (event.keycode === 13)
    var item = $('#newTodo').val()
    console.log(item)
  },

  handleSubmitEnter : function(event){
    if(event.keyCode === 13 ){
      this.handleSubmitClick();
      this.send();
      $('#newTodo').val("");
    }
  },

});

// this view will create a new view where we can handle the users interaction.
// will listen for events that happen within our view. i.e. when user presses
// a key on the message input and when user clicks on the send button

// var TodoEditView = Backbone.View.extend({
//     template: _.template($('#ListViewTemplate').html()),
//     events: {
//       'tagName': 'li',
//       // 'click .toggleButton': 'toggle',
//       'click #newTodo' : 'handleSubmitClick'
//     },
//
//     // toggle: function(){var todo = $(".toggleButton").click(function() {
//     //   $(".words").toggle ("slow");
//     // })
//     // },
//
//     render: function() {
//       var data = {
//         toDo: '',
//       }
//       if (this.model) {
//         data = this.model.toJSON();
//       }
//
//       this.$el.html(this.template(data));
//       return this;
//     },
//
//   },
// this function will be called after the handleEnter and handleSendClick is run.
// below is where the input value will be stored to the correct input.

  // handleSubmitClick: function(){
  //   var thing = $('#newTodo').val()
  //   console.log(thing);
  // },

////////////////////////////
//          posts         //
////////////////////////////


// creates a post model so that it will send the data to the server, and
// add the new post model to the posts collection, will keep the list up to date
// and send the data to the server
//
// if(this.model){
//   this.model.set({
//     todo : todo
//   }),
//
//   var model = this.model;
//   this.model.save().then(function(){
//     App.router.navigate('post/' + model.get('_id'), {trigger: true});
//   });
// } else {
//   App.collection.create({
//     todo : todo
//   }, {
//     success: function(){
//       App.router.navigate('home', {trigger: true});
//       }
//     })
//   }
// },



//////////////////////////////
//        routes            //
//////////////////////////////

var Router = Backbone.Router.extend({
  routes: {
    '' : 'home'
  },

  home: function(){
    //creates a new homepage view
    var view = new HomeView();
    //renders the template to the view
    view.render();
    //renders the view to the main tag
    $('header').html(view.el);

    var collection = new TodoList();
    var listView = new TodoView({
      collection : collection
    });

    collection.fetch({
      success : function(){
        listView.render();
        $('#main').html(listView.el);
      }
    })
  }
});




// function buildDropDown(){
//   App.collection = new TodoList();
//   // create a new home page view
//   var dropDownView = new TodoListView({
//     collection : App.collection
//   });
//
// App.collection.fetch().then(function(){
//   //render the template to the view
//   dropDownView.render();
//   //render the view to the main tag
//   $('.sidebar').html(dropDownView.el);
  var App = {};
  App.router = new Router();
  Backbone.history.start();



// buildDropDown();
