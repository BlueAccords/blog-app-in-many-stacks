require 'rails_helper'

RSpec.describe "Posts API", :type => :request do

  request_headers = {
    "Accept" => "application/json",
    "Content-Type" => "application/json"
  } 

  let(:user) { FactoryGirl.create(:user, :username => 'testtest', :password => 'testtest') }
  let(:token) { get_user_token(user) }
  let(:default_post) { FactoryGirl.create(:post, :title => "This is a title", :user_id => user.id ) }

  #
  # SHOW POST
  # 
  describe "GET /posts/:id" do

    # Authorized
    it "Shows the Post." do
      get(
        "/posts/#{default_post.id}?token=#{token}", 
        request_headers
      )
      # 200 means everything OK
      expect(response.status).to eq 200
      body = JSON.parse(response.body)
      #expect response to equal the same as the user we made earlier
      expect(body['post']['title']).to eq("This is a title")
    end 

  end  

  #
  # SHOW ALL POSTS
  # 
  describe "GET /posts/" do

    # Authorized
    it "Shows all posts." do
      get(
        "/posts/?token=#{token}", 
        request_headers
      )
      # 200 means everything OK
      expect(response.status).to eq 200
    end 
  end 

  #
  # SHOW POSTS BY USER
  # 
  describe "GET /users/:user_id/posts" do

    # Authorized
    it "Shows all posts by user." do

      FactoryGirl.create(:post, :title => "This is a title", :user_id => user.id)
      FactoryGirl.create(:post, :title => "Another Title", :user_id => user.id)
      # Create a Post from a different user to make sure it doesn't show up in the list
      FactoryGirl.create(:post, :title => "This is a title from two", :user_id => 2)

      get(
        "/users/#{user.id}/posts"
      )
      # 200 means everything OK

      expect(response.status).to eq 200
      body = JSON.parse(response.body)

      #expect response to equal the same as the user we made earlier
      body.each do |post|
        expect(post['user_id']).to eq(user.id)
      end 

    end 
  end   

  #
  # CREATE POST
  #
  describe "POST /posts/" do
    header_params = {
      'post' => {
        'title' => 'A new post title',
        'body' => 'Test test'
      }
    }.to_json
    wrong_params = {
      'post' => {
        'body' => 'Test test'
      }
    }.to_json    

    it "Creates a Post, when correct info/ Authorized." do

      post("/posts?token=#{token}", header_params, request_headers)

      # 200 means everything OK
      expect(response.status).to eq 200
      body = JSON.parse(response.body)
      expect(body['post']['user_id']).to eq(user.id)
    end 

    it "Doesn't create a Post, without a title" do
      post("/posts?token=#{token}", wrong_params, request_headers)
      expect(response.status).to eq 422
    end   

    it "Doesn't create a Post, without being logged in" do
      post("/posts", header_params, request_headers)
      expect(response.status).to eq 401
    end     

  end

  #
  # UPDATE POST
  #
  describe "UPDATE /posts/:id" do
    header_params = {
      'post' => {
        'title' => 'A new post title'
      }
    }.to_json

    it "Updates a Post, when Authorized." do


      put("/posts/#{default_post.id}?token=#{token}", header_params, request_headers)

      # 200 means everything OK
      expect(response.status).to eq 200
      body = JSON.parse(response.body)
      expect(body['post']['title']).to eq('A new post title')
    end 

    it "Doesn't update a Post, when Unauthorized." do

      put("/posts/#{default_post.id}", header_params, request_headers)

      # 401 means unauthorized
      expect(response.status).to eq 401
      body = JSON.parse(response.body)
    end    

  end

  #
  # DELETE POST
  #
  describe "DELETE /posts/:id" do

    it "Deletes a Post, when Authorized." do

      delete("/posts/#{default_post.id}?token=#{token}", request_headers)

      # 200 means everything OK
      expect(response.status).to eq 200
      body = JSON.parse(response.body)
      expect(body['deleted_id']).to eq(default_post.id)
    end 

    it "Does not delete post, when unauthorized." do

      delete("/users/#{default_post.id}", request_headers)

      # 401 for Unauthorized
      expect(response.status).to eq 401
    end     

  end

end

