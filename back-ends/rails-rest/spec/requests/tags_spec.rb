require 'rails_helper'

RSpec.describe "Tags API", :type => :request do

  request_headers = {
    "Accept" => "application/json",
    "Content-Type" => "application/json"
  } 

  let(:user) { FactoryGirl.create(:user, :username => 'testtest', :password => 'testtest') }
  let(:token) { get_user_token(user) }
  let(:default_tag) { FactoryGirl.create(:tag, :text => "This is a title" ) }

  #
  # GET ALL TAGS
  # 
  describe "GET /tags" do

    # Authorized
    it "Shows all tags." do
      get(
        "/tags/", 
        request_headers
      )
      # 200 means everything OK
      expect(response.status).to eq 200
    end 
  end    

  #
  # CREATE NEW TAG
  # 
  describe "POST /tags" do

    header_params = {
      'tag' => {
        'text' => 'A new tag'
      }
    }.to_json

    # Authorized
    it "Creates a tag, for logged in user." do
      post(
        "/tags?token=#{token}", 
        header_params,
        request_headers
      )

      # 200 means everything OK
      expect(response.status).to eq 200
      body = JSON.parse(response.body)
      expect(body['tag']['text']).to eq('a-new-tag')
    end 

    # Unauthorized
    it "Returns error without Authentication" do
      post(
        "/tags", 
        header_params,
        request_headers
      )

      expect(response.status).to eq 401
    end 

  end  


  #
  # UPDATE POST
  #
  describe "UPDATE /tags/:id" do
    header_params = {
      'tag' => {
        'text' => 'changed text'
      }
    }.to_json

    it "Updates a Tag, when Authorized." do

      put("/tags/#{default_tag.id}?token=#{token}", header_params, request_headers)
 
      # 200 means everything OK
      expect(response.status).to eq 200
      body = JSON.parse(response.body)
      expect(body['tag']['text']).to eq('changed-text')
    end 

    it "Returns error without Authentication" do

      put("/tags/#{default_tag.id}", header_params, request_headers)

      # 401 means unauthorized
      expect(response.status).to eq 401
      body = JSON.parse(response.body)
    end    

  end
 
  #
  # DELETE POST
  #
  describe "DELETE /posts/:id" do

    it "Deletes a Tag, when Authorized." do

      delete("/tags/#{default_tag.id}?token=#{token}", request_headers)

      # 200 means everything OK
      expect(response.status).to eq 200
      body = JSON.parse(response.body)
      expect(body['deleted_id']).to eq(default_tag.id)
    end 

    it "Returns error without Authentication" do

      delete("/tags/#{default_tag.id}", request_headers)

      # 401 for Unauthorized
      expect(response.status).to eq 401
    end     

  end

end

