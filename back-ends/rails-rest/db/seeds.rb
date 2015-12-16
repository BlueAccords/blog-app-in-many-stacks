#
# SEED DATA
# 

# USERS 
User.delete_all
test      = User.create!(id: 1, name: 'Bob', email: "test@test.com", username: "test1", password: "testtest", password_confirmation: "testtest" )
testTwo   = User.create!(id: 2, name: 'Bob', email: "bob@test.com",  username: "te-st", password: "testtest", password_confirmation: "testtest" )
testThree = User.create!(id: 3, name: 'Jim', email: "jim@test.com",  username: "tes!t", password: "testtest", password_confirmation: "testtest" )
