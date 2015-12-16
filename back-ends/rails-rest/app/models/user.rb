class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Easy API JSON responces
  # acts_as_api 

  # We don't want blank spaces in our Usernames since they are not URL friendly 
  validates :username, format: { without: /\s/, :message=>"can not contain blank spaces." }  

  # api_accessible :name_only do |template|
  #   template.add :name
  # end


end
