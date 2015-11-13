///////////////////////////////
///////////////////////////////
//          models           //
///////////////////////////////
///////////////////////////////

//creates a model for the to-do list

var Todo = Backbone.Model.extend({
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
    'click .submit' : 'handleSubmitClick',
    'keypress #newTodo' : 'handleSubmitEnter'
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
    }
  }

  // listen to the key click, which is defined above
//
//   handleSubmitClick: function(event){
//
//     return item;
//   },
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

//listen to the key click, which is defined above

// handleSubmitClick: function(event){
//   if (event.keycode === 13) {
//     this.send();
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
    // console.log('called home..et');
    //creates a new homepage view
    var mainView = new HomeView();
    //renders the template to the view
    mainView.render();
    //renders the view to the main tag
    $('header').html(mainView.el);
  },
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
