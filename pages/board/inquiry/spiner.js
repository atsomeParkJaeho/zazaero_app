import React, { useState } from 'react';
import { View, ActivityIndicator } from 'react-native';

export default function App() {
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        // 데이터 로딩
        setLoading(false);
    };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {loading && <ActivityIndicator size="large" color="blue" />}
            {/* 로딩 스피너 */}
            {!loading && <ActivityIndicator size="large" color="green" />}
            {/* 데이터 화면 */}

        </View>
    );
}