require "rails_helper"
RSpec.describe "List of Questions" do
    it "displays the question and answer saved" do
        question = Question.create(content: "How many Days in a year", answer: "365")
   
    visit "/"
    expect(page).to have_text("How many Days in a year")
    expect(page).to have_text("365")
    expect(page).to have_link ("New Question")
    end 
end