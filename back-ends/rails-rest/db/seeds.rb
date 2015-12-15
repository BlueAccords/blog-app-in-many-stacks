#
# SEED DATA
# 

# USERS 
User.delete_all
test      = User.create!(id: 1, email: "test@test.com", username: "test1", password: "testtest", password_confirmation: "testtest" )
testTwo   = User.create!(id: 2, email: "bob@test.com",  username: "test2", password: "testtest", password_confirmation: "testtest" )
testThree = User.create!(id: 3, email: "jim@test.com",  username: "test3", password: "testtest", password_confirmation: "testtest" )
