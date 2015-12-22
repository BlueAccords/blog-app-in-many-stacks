class Post < ActiveRecord::Base
  belongs_to :user

  validates :title, presence: true
  validates :body, presence: true
  validates_uniqueness_of :url_path 


  has_many :taggings, dependent: :destroy
  has_many :tags, through: :taggings
end
