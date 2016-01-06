require 'rails_helper'

RSpec.describe "User API", :type => :request do

  request_headers = {
    "Accept" => "application/json",
    "Content-Type" => "application/json"
  } 

  let(:user) { FactoryGirl.create(:user, :username => 'testtest', :password => 'testtest') }
  let(:token) { get_user_token(user) }

  #
  # SHOW USER
  # 
  describe "GET /users/:id" do

    # Authorized
    it "Shows the User" do
      get(
        "/users/#{user.id}", 
        @request_headers
      )
      # 200 means everything OK
      expect(response.status).to eq 200
      body = JSON.parse(response.body)
      #expect response to equal the same as the user we made earlier
      expect(body['user']['username']).to eq(user.username)
    end 

  end  

  #
  # SIGN IN 
  #
  describe "POST /sign-in" do

    # Authorized
    it "Signs in with correct credentials" do

      header_params = {
        'user' => {
          'email' => user.email,
          'password' => 'testtest'
        }
      }.to_json

      post('/sign-in', header_params, request_headers)

      # 200 means everything OK
      expect(response.status).to eq 200
      body = JSON.parse(response.body)

      # expect response to equal the same as the user we made earlier
      expect(body['user']['username']).to eq(user.username)
    end 

    # Authorized
    it "Returns error with incorrect credentials" do

      header_params = {
        'user' => {
          'email' => user.email,
          'password' => 'notcorrect'
        }
      }.to_json

      post('/sign-in', header_params, request_headers)

      expect(response.status).to eq 401
    end  
  end   

  #
  # CREATE USER
  #
  describe "POST /users" do

    it "Creates a new User, when required fields filled." do

      header_params = {
        'user' => {
          'name'  => 'Example User',
          'email' => 'example@chie.do',
          'username' => 'example_user',
          'password' => 'testtest'
        }
      }.to_json

      post('/users', header_params, request_headers)

      # 200 means everything OK
      expect(response.status).to eq 200
      body = JSON.parse(response.body)
      expect(body['user']['username']).to eq('example_user')
    end 

    it "Does not create a new User, when required field(s) missing." do

      header_params = {
        'user' => {
          'name'  => 'Example User',
          'email' => 'example@chie.do',
          'password' => 'testtest'
        }
      }.to_json

      post('/users', header_params, request_headers)

      # 422 means everything Unprocessable entity
      expect(response.status).to eq 422
      
      body = JSON.parse(response.body)
      # expect response to have appropriate error
      expect(body['errors']['username']).to eq(["can't be blank"])
    end 
  end 

  #
  # DELETE USER
  #
  describe "DELETE /users/:id" do

    it "Deletes a User, when Authorized." do

      delete("/users/#{user.id}?token=#{token}", request_headers)

      # 200 means everything OK
      expect(response.status).to eq 200
      body = JSON.parse(response.body)
      expect(body['deleted_id']).to eq(user.id)
    end 

    it "Does not delete a User, when unauthorized." do

      delete("/users/#{user.id}", request_headers)

      # 401 for Unauthorized
      expect(response.status).to eq 401
    end     

  end

  #
  # UPDATE USER
  #
  describe "PUT /users/:id" do

    it "Update User, when Authorized." do

      header_params = {
        'user' => {
          'username' => 'example_user',
        }
      }.to_json

      put("/users/#{user.id}?token=#{token}", header_params, request_headers)

      # 200 means everything OK
      expect(response.status).to eq 200
      body = JSON.parse(response.body)
      expect(body['user']['username']).to eq('example_user')
    end 

    it "Does not update User, when Unauthorized." do

      header_params = {
        'user' => {
          'username' => 'example_user',
        }
      }.to_json

      put("/users/#{user.id}", header_params, request_headers)

      # 200 means everything OK
      expect(response.status).to eq 401
    end     
  end 

end

