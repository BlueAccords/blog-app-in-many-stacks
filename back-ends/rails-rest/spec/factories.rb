require 'faker'

FactoryGirl.define do

  factory :user do
    before(:create, :custom) { fake_email = Faker::Internet.email }
    email { Faker::Internet.email }
    username { Faker::Internet.email }
    password { Devise.friendly_token.first(8) } 
  end
  
  factory :post do
    title { Faker::Company.name }
    body { Faker::Lorem.paragraph }
    user_id { 1 }
  end

end
