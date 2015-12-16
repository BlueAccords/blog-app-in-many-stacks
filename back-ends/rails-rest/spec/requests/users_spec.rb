require 'rails_helper'

RSpec.describe "User API", :type => :request do
  before(:each) do
    @user = FactoryGirl.create(:user, :password => 'testtest')
    @token = get_user_token(@user)
  end

  request_headers = {
    "Accept" => "application/json",
    "Content-Type" => "application/json"
  } 

  describe "GET /saved_uploads" do
    it "shows all the users" do
    end 
  end  
end

