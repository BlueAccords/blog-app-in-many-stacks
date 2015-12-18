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
        @request_headers
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
        @request_headers
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

      # Create a Post from a different user to make sure it doesn't show up in the list
      FactoryGirl.create(:post, :title => "This is a title", :user_id => 2)
      
      get(
        "/users/#{user.id}/posts?token=#{token}", 
        @request_headers
      )
      # 200 means everything OK
      expect(response.status).to eq 200
      body = JSON.parse(response.body)
      #expect response to equal the same as the user we made earlier
      expect(body['posts']).to all( have_attributes(:user_id => user.id) )
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

