class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :youga

  validates :content, presence: true
end
