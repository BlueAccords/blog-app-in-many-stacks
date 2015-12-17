# This file is copied to spec/ when you run 'rails generate rspec:install'
ENV['RAILS_ENV'] ||= 'test'
require 'spec_helper'
require File.expand_path('../../config/environment', __FILE__)
require 'rspec/rails'
require 'devise'

# @param {Object} user  - The user object created by Factory Girl
# @return {String} token - Token for the user 
def get_user_token(user)
  post "/sign-in", { 'user' => {'email' => user.email, 'password' => 'testtest'}}.to_json, {
    "Accept" => "application/json",
    "Content-Type" => "application/json"
  } 
  parsed_resp = JSON.parse(response.body)
  return parsed_resp['token']
end

ActiveRecord::Migration.maintain_test_schema!

RSpec.configure do |config|
  # Remove this line if you're not using ActiveRecord or ActiveRecord fixtures
  config.fixture_path = "#{::Rails.root}/spec/fixtures"

  # If you're not using ActiveRecord, or you'd prefer not to run each of your
  # examples within a transaction, remove the following line or assign false
  # instead of true.
  config.use_transactional_fixtures = true

  # The different available types are documented in the features, such as in
  # https://relishapp.com/rspec/rspec-rails/docs
  config.infer_spec_type_from_file_location!
end
