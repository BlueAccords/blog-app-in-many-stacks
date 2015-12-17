class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # We don't want blank spaces in our Usernames since they are not URL friendly 
  validates :username, format: { without: /\s/, :message=>"can not contain blank spaces." } 
  validates :username, presence: true
  validates :email, presence: true
  validates_uniqueness_of :username 
end
