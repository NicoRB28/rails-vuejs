require 'test_helper'

class WellcomeControllerTest < ActionDispatch::IntegrationTest
  test "should get home" do
    get wellcome_home_url
    assert_response :success
  end

end
