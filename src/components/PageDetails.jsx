import { useEffect, useState } from 'react';

function PageDetails({ accessToken }) {

  console.log("token : ", accessToken)
  const [pages, setPages] = useState([]);
  const [selectedPageId, setSelectedPageId] = useState('');
  const [pageInfo, setPageInfo] = useState({
    followers: 0,
    engagement: 0,
    impressions: 0,
    reactions: 0,
  });
  const [sinceDate, setSinceDate] = useState('');
  const [untilDate, setUntilDate] = useState('');

  // Function to fetch the list of pages
  const fetchPages = async () => {
    try {
      const response = await fetch(`https://graph.facebook.com/v14.0/me/accounts?access_token=${accessToken}`);
      const data = await response.json();

      console.log("data : ", data)
      console.log("response : ", response)

      if (data && data.data) {
        // Extract only the name and id
        const pageList = data.data.map(page => ({
          id: page.id,
          name: page.name,
        }));
        setPages(pageList);
        console.log("page List : ", pageList)
      }
    } catch (error) {
      console.error('Error fetching pages:', error);
    }
  };

  // Function to fetch page details from the Facebook Graph API
  const fetchPageDetails = async () => {
    try {
      let apiUrl = `https://graph.facebook.com/v14.0/${selectedPageId}/insights?metric=page_fans,page_engagement,page_impressions,page_actions_post_reactions_total&period=total_over_range&access_token=${accessToken}`;

      if (sinceDate) {
        apiUrl += `&since=${sinceDate}`;
      }
      if (untilDate) {
        apiUrl += `&until=${untilDate}`;
      }

      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data && data.data) {
        const followers = data.data.find(metric => metric.name === 'page_fans')?.values[0]?.value || 0;
        const engagement = data.data.find(metric => metric.name === 'page_engagement')?.values[0]?.value || 0;
        const impressions = data.data.find(metric => metric.name === 'page_impressions')?.values[0]?.value || 0;
        const reactions = data.data.find(metric => metric.name === 'page_actions_post_reactions_total')?.values[0]?.value || 0;

        setPageInfo({
          followers,
          engagement,
          impressions,
          reactions,
        });
      }
    } catch (error) {
      console.error('Error fetching page details:', error);
    }
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedPageId) {
      fetchPageDetails();
    } else {
      alert("Please select a page.");
    }
  };

  // Fetch pages when the component mounts
  useEffect(() => {
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {/* Left side: Form */}
      <div style={{ width: '45%' }}>
        <button
          className='mb-8 px-2 py-1 border-black bg-blue-500 rounded-lg'
          onClick={
            fetchPages
          }
          type="button"
        >
          fetch pages
        </button>
        <form onSubmit={handleSubmit}>
          <label htmlFor="pageSelect">Select a Page:</label>
          <select
            id="pageSelect"
            onChange={(e) => setSelectedPageId(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '10px' }}
          >
            <option value="">Select Page</option>
            {pages.map((page) => (
              <option key={page.id} value={page.id}>
                {page.name}
              </option>
            ))}
          </select>

          <label htmlFor="sinceDate" style={{ marginTop: '20px' }}>Since:</label>
          <input
            type="date"
            id="sinceDate"
            value={sinceDate}
            onChange={(e) => setSinceDate(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '10px' }}
          />

          <label htmlFor="untilDate" style={{ marginTop: '20px' }}>Until:</label>
          <input
            type="date"
            id="untilDate"
            value={untilDate}
            onChange={(e) => setUntilDate(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '10px' }}
          />

          <button type="submit" style={{ width: '100%', padding: '10px', marginTop: '20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
            Submit
          </button>
        </form>
      </div>

      {/* Right side: Page details */}
      <div style={{ width: '50%', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h3>Page Details</h3>

        <div style={{ marginBottom: '10px' }}>
          <span style={{ fontWeight: 'bold' }}>Followers:</span>
          <span> {pageInfo.followers}</span>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <span style={{ fontWeight: 'bold' }}>Engagement:</span>
          <span> {pageInfo.engagement}</span>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <span style={{ fontWeight: 'bold' }}>Impressions:</span>
          <span> {pageInfo.impressions}</span>
        </div>

        <div>
          <span style={{ fontWeight: 'bold' }}>Reactions:</span>
          <span> {pageInfo.reactions}</span>
        </div>
      </div>
    </div>
  );
}

export default PageDetails;
