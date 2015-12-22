class Tag < ActiveRecord::Base
  validates :text, presence: true
  
  has_many :taggings, dependent: :destroy
  has_many :posts, through: :taggings  
end
