require 'faker'

FactoryGirl.define do

  factory :user do
    before(:create, :custom) { fake_email = Faker::Internet.email }
    email { Faker::Internet.email }
    username { Faker::Internet.email }
    password { Devise.friendly_token.first(8) } 
  end

end
