#
# SEED DATA
# 

# USERS 
User.delete_all
test      = User.create!(id: 1, name: 'Bob', email: "test@test.com", username: "test1", password: "testtest", password_confirmation: "testtest" )
testTwo   = User.create!(id: 2, name: 'Bob', email: "bob@test.com",  username: "te-st", password: "testtest", password_confirmation: "testtest" )
testThree = User.create!(id: 3, name: 'Jim', email: "jim@test.com",  username: "tes!t", password: "testtest", password_confirmation: "testtest" )

# POSTS 
Post.delete_all
post1 = Post.create!(id: 1, :title => "How to Boil an Egg", :body => "Nullam quis risus eget urna mollis ornare vel eu leo.", :user_id => 1, :url_path => 'how-to-boil-an-egg' )
post2 = Post.create!(id: 2, :title => "How to Sing a Song", :body => "Nullam quis risus eget urna mollis ornare vel eu leo.", :user_id => 1, :url_path => 'test' )
post3 = Post.create!(id: 3, :title => "How to kill a bird", :body => "Nullam quis risus eget urna mollis ornare vel eu leo.", :user_id => 2, :url_path => 'test-2' ) 
