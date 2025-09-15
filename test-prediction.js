// Test script to verify prediction flow
const testData = {
  radius_mean: 14.127,
  texture_mean: 19.289,
  perimeter_mean: 91.969,
  area_mean: 654.889,
  smoothness_mean: 0.096,
  compactness_mean: 0.104,
  concavity_mean: 0.089,
  concave_points_mean: 0.048,
  symmetry_mean: 0.181,
  fractal_dimension_mean: 0.063
};

async function testPrediction() {
  try {
    console.log('Testing tabular prediction...');
    
    const response = await fetch('http://localhost:3000/api/predict/tabular', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });
    
    if (response.ok) {
      const result = await response.json();
      console.log('✅ Prediction successful!');
      console.log('Response:', JSON.stringify(result, null, 2));
      
      // Test if we can retrieve the result
      if (result.predictionId) {
        console.log('\nTesting result retrieval...');
        const resultResponse = await fetch(`http://localhost:3000/api/results/${result.predictionId}`);
        
        if (resultResponse.ok) {
          const storedResult = await resultResponse.json();
          console.log('✅ Result retrieval successful!');
          console.log('Stored result:', JSON.stringify(storedResult, null, 2));
        } else {
          console.log('❌ Result retrieval failed:', resultResponse.status);
        }
      }
    } else {
      console.log('❌ Prediction failed:', response.status);
      const error = await response.text();
      console.log('Error:', error);
    }
  } catch (error) {
    console.log('❌ Network error:', error.message);
  }
}

// Run the test
testPrediction();
