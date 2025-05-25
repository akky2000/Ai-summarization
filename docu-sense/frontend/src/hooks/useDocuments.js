// // src/hooks/useDocuments.js
// import { useState, useEffect, useCallback } from 'react';
// import axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux';
// import { setDocuments, clearDocuments } from '../redux/slice/documentSlice';
// import { toast } from 'react-toastify';

// export function useDocuments() {
//   const dispatch = useDispatch();
//   const [documents, setLocalDocuments] = useState([]);
//   const [isLoading,  setIsLoading]     = useState(false);
//   const [error,      setError]         = useState(null);
//   const {user} = useSelector(state=> state.auth)

//   const fetchDocs = useCallback(async () => {
//     if (!user?._id) return;
//     setIsLoading(true);
//     setError(null);

//     try {
//       const endpoint = `http://localhost:3000/api/v3/all-documents/${user?._id}`;
//       const { data } = await axios.get(endpoint);

//       if (data.status) {
//         setLocalDocuments(data.data.documents);
//         dispatch(setDocuments(data.data.documents));
//       } else {
//         throw new Error(data.message || 'Fetch failed');
//       }
//     } catch (err) {
//       const msg = err.response?.data?.message || err.message || 'Failed to load';
//       setError(msg);
//       toast.error(msg);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [user._id, dispatch]);

//   useEffect(() => {
//     fetchDocs();
//     return () => dispatch(clearDocuments());
//   }, [fetchDocs, dispatch]);

//   return { documents, isLoading, error, refresh: fetchDocs };
// }





import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setDocuments, clearDocuments } from '../redux/slice/documentSlice';
import { toast } from 'react-toastify';

export function useDocuments() {
  const dispatch = useDispatch();
  const [documents, setLocalDocuments] = useState([]);
  const [isLoading,  setIsLoading]     = useState(false);
  const [error,      setError]         = useState(null);
  const { user } = useSelector(state => state.auth);

  const fetchDocs = useCallback(async () => {
    if (!user?._id) return;

    setIsLoading(true);
    setError(null);

    try {
      const endpoint = `http://localhost:3000/api/v3/all-documents/${user._id}`;
      const { data } = await axios.get(endpoint);

      if (data.status) {
        setLocalDocuments(data.data.documents || []);
        dispatch(setDocuments(data.data.documents || []));
      } else {
        throw new Error(data.message || 'Fetch failed');
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to load';
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  }, [user?._id, dispatch]); // <-- fixed here using optional chaining

  useEffect(() => {
    fetchDocs();
    return () => dispatch(clearDocuments());
  }, [fetchDocs, dispatch]);

  return { documents, isLoading, error, refresh: fetchDocs };
}
