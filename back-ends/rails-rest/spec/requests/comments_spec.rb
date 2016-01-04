require 'rails_helper'

RSpec.describe "Posts API", :type => :request do
  request_headers = {
    "Accept" => "application/json",
    "Content-Type" => "application/json"
  } 

  let(:user) { FactoryGirl.create(:user, :username => 'testtest', :password => 'testtest') }
  let(:token) { get_user_token(user) }
  let(:default_post) { FactoryGirl.create(:post, :user_id => user.id ) } 
  let(:default_comment) { FactoryGirl.create( :comment,
      :text => "This is a comment", 
      :user_id => user.id, 
      :post_id => default_post.id
    ) }

  #
  # SHOW COMMENT
  # 
  describe "GET /posts/:post_id/comments" do

    # Authorized
    it "Shows the comment." do
      default_comment.save

      get(
        "/posts/#{default_post.id}/comments", 
        request_headers
      )

      # 200 means everything OK
      expect(response.status).to eq 200
      body = JSON.parse(response.body)
      expect(body['comments'][0]['text']).to eq("This is a comment")
    end 

  end 

  #
  # CREATE COMMENT
  # 
  describe "POST /posts/:post_id/comments" do

    header_params = {
      'comment' => {
        'text' => 'A new post comment',
      }
    }.to_json

    # Authorized
    it "Creates comment. When Authorized" do
      post(
        "/posts/#{default_post.id}/comments?token=#{token}", 
        header_params,
        request_headers
      )

      # 200 means everything OK
      expect(response.status).to eq 200
      body = JSON.parse(response.body)
    end 

    # Unauthorized
    it "Returns error without Authentication" do
      post(
        "/posts/#{default_post.id}/comments", 
        header_params,
        request_headers
      )

      expect(response.status).to eq 401
    end 

  end 

  #
  # UPDATE COMMENT
  # 
  describe "UPDATE /comments/:id" do

    header_params = {
      'comment' => {
        'text' => 'A new post comment',
      }
    }.to_json

    # Authorized
    it "Updates comment. When Authorized" do
      put(
        "/comments/#{default_comment.id}?token=#{token}", 
        header_params,
        request_headers
      )
      body = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(body['comment']['text']).to eq("A new post comment")
    end 

    # Unauthorized
    it "Returns error without Authentication" do
      put(
        "/comments/#{default_comment.id}", 
        request_headers
      )

      expect(response.status).to eq 401
    end 

  end 

  #
  # DELETE COMMENT
  # 
  describe "DELETE /comments/:id" do

    # Authorized
    it "Deletes comment. When Authorized" do
      delete(
        "/comments/#{default_comment.id}?token=#{token}", 
        request_headers
      )
      body = JSON.parse(response.body)
      expect(response.status).to eq 200
      expect(body['deleted_id']).to eq(default_comment.id)
    end 

    # Unauthorized
    it "Returns error without Authentication" do
      delete(
        "/comments/#{default_comment.id}", 
        request_headers
      )

      expect(response.status).to eq 401
    end 

  end 

end