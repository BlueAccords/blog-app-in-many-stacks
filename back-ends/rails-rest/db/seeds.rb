#
# SEED DATA
# 

# USERS 
User.delete_all
test      = User.create!(id: 1, name: 'Bob', email: "test@test.com", username: "test", password: "testtest", password_confirmation: "testtest" )
testTwo   = User.create!(id: 2, name: 'Bob', email: "bob@test.com",  username: "t@st", password: "testtest", password_confirmation: "testtest" )
testThree = User.create!(id: 3, name: 'Jim', email: "jim@test.com",  username: "tst!", password: "testtest", password_confirmation: "testtest" )

# POSTS 
Post.delete_all
post1 = Post.create!(id: 1, :title => "How to Boil an Egg", :body => "Nullam quis risus eget urna mollis ornare vel eu leo.", :user_id => 1, :url_path => 'how-to-boil-an-egg' )
post2 = Post.create!(id: 2, :title => "How to Sing a Song", :body => "Nullam quis risus eget urna mollis ornare vel eu leo.", :user_id => 1, :url_path => 'test' )
post3 = Post.create!(id: 3, :title => "How to kill a bird", :body => "Nullam quis risus eget urna mollis ornare vel eu leo.", :user_id => 2, :url_path => 'test-2' ) 

# TAGS
Tag.delete_all
tag1 = Tag.create!(id: 1, :text => 'cooking-skills')
tag2 = Tag.create!(id: 2, :text => 'bippity-boppity')
tag3 = Tag.create!(id: 3, :text => 'ninja-jedi-wizard')

# POST TAGS
PostTag.delete_all
pt_1 = PostTag.create!(id: 1, :post_id => 1, :tag_id => 1)
pt_2 = PostTag.create!(id: 2, :post_id => 2, :tag_id => 1)
pt_3 = PostTag.create!(id: 3, :post_id => 3, :tag_id => 1)
pt_4 = PostTag.create!(id: 4, :post_id => 1, :tag_id => 2)
pt_5 = PostTag.create!(id: 5, :post_id => 2, :tag_id => 2)

# COMMENTS 
comment1 = Comment.create!(id: 1, :post_id => 1, :user_id => 1, :text => "Etiam porta sem malesuada magna mollis euismod.")
comment2 = Comment.create!(id: 2, :post_id => 2, :user_id => 1, :text => "Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.")
comment2 = Comment.create!(id: 3, :post_id => 2, :user_id => 2, :text => "Maecenas faucibus mollis interdum.")