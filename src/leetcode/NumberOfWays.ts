function numberOfWays(s: string): number {

    // first thing to identify is if there is just one combination possible, for this you
    // need at least a 1, a 0 and a 1, or a 010

    let cnt0= 0, cnt1 = 0, cnt01 = 0, cnt10 = 0, sum = 0;

    // example for 0011100


    // Iteration 1 (i = 6, s[6] = '0'):
    // cnt0++ -> cnt0 = 1
    // cnt01 += cnt1 -> cnt01 = 0
    // sum += cnt10 -> sum = 0
    // Iteration 2 (i = 5, s[5] = '0'):
    // cnt0++ -> cnt0 = 2
    // cnt01 += cnt1 -> cnt01 = 0
    // sum += cnt10 -> sum = 0
    // Iteration 3 (i = 4, s[4] = '1'):
    // cnt1++ -> cnt1 = 1
    // cnt10 += cnt0 -> cnt10 = 2
    // sum += cnt01 -> sum = 0
    // Iteration 4 (i = 3, s[3] = '1'):
    // cnt1++ -> cnt1 = 2
    // cnt10 += cnt0 -> cnt10 = 4
    // sum += cnt01 -> sum = 0
    // Iteration 5 (i = 2, s[2] = '1'):
    // cnt1++ -> cnt1 = 3
    // cnt10 += cnt0 -> cnt10 = 6
    // sum += cnt01 -> sum = 0
    // Iteration 6 (i = 1, s[1] = '0'):
    // cnt0++ -> cnt0 = 3
    // cnt01 += cnt1 -> cnt01 = 3
    // sum += cnt10 -> sum = 6
    // Iteration 7 (i = 0, s[0] = '0'):
    // cnt0++ -> cnt0 = 4
    // cnt01 += cnt1 -> cnt01 = 6
    // sum += cnt10 -> sum = 12
    // Final values:
    //     cnt0 = 4
    //     cnt1 = 3
    //     cnt01 = 6
    //     cnt10 = 6
    //     sum = 12
    // The final result returned by the function would be 12.



    for ( let i = s.length - 1; i > 0; i--){
        if ( s.charAt(i) === "0")
            cnt0++, cnt01 += cnt1, sum += cnt10
        else
            cnt1++, cnt10 + cnt0 , sum += cnt01;
    }

    return sum;

};