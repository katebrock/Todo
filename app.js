///////////////////////////////
///////////////////////////////
//          models           //
///////////////////////////////
///////////////////////////////

//creates a model for the to-do list

var Todo = Backbone.Model.extend({
  defaults:{
    //the todo lists attributes and values
    title: "list item",
    status: false
  },
});

///////////////////////////////
///////////////////////////////
//        collections        //
///////////////////////////////
///////////////////////////////

//creates a collection of the todos

var TodoList = Backbone.Collection.extend({
  model: Todo,
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

  // tagName: 'li'
  //
  // events:{
  //   'click': 'toggleTodo'
  // },

  initialize: function(){
    this.listenTo(this.collection, 'change', this.render);
  },

  render: function(){
    this.$el.html(this.template({
      list: this.collection.toJSON()
    }));
    return this;
  }
});

// this view will create a new view where we can handle the users interaction.
// will listen for events that happen within our view. i.e. when user presses
// a key on the message input and when user clicks on the send button

var TodoEditView = Backbone.View.extend({
    template: _.template($('#EditViewTemplate').html()),
    render: function() {
      var data = {
        todo: '',
      }
      if (this.model) {
        data = this.model.toJSON();
      }

      this.$el.html(this.template(data));
    },
    events: {
      'tagName': 'li'
      'click': 'toggleTodo'
      }
  },
  // this function will be called after the handleEnter and handleSendClick is run.
// below is where the input value will be stored to the correct input.

  handleSubmitClick: function(){
    var todo        = this.$('.todo').val();
